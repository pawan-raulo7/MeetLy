const Meeting = require("../models/Meeting");

const Task = require("../models/Task");

const { Op } = require("sequelize");

const sequelize =
    require("../config/db");

const {
    generateMeetingSummary,
} = require("../utils/groq");

/* =========================================
   PROCESS MEETING + TASKS
========================================= */

const processMeeting =
    async (
        title,
        transcript,
        userId
    ) => {

        const t =
            await sequelize.transaction();

        try {

            let aiResponse =
                await generateMeetingSummary(
                    transcript
                );

            let summaryText =
                "AI summary generation failed temporarily.";

            let keyPointsText =
                "";

            let tasksList = [];

            if (aiResponse) {

                summaryText =
                    aiResponse.summary ||
                    summaryText;

                keyPointsText =
                    aiResponse.keyPoints
                        ? aiResponse.keyPoints.join(
                            "\n"
                        )
                        : "";

                tasksList =
                    aiResponse.tasks || [];
            }

            const meeting =
                await Meeting.create(
                    {
                        title,
                        transcript,
                        summary:
                            summaryText,
                        keyPoints:
                            keyPointsText,
                        userId,
                    },
                    {
                        transaction: t,
                    }
                );

            /* CREATE TASKS */

            if (
                tasksList.length > 0
            ) {

                const tasksData =
                    tasksList.map(
                        (taskObj) => {

                            let dueDate =
                                taskObj.dueDate;

                            if (
                                !dueDate ||
                                dueDate ===
                                "null" ||
                                dueDate ===
                                "None"
                            ) {

                                dueDate =
                                    null;
                            }

                            return {

                                task:
                                    taskObj.task,

                                owner:
                                    taskObj.owner ||
                                    "Not Assigned",

                                priority:
                                    [
                                        "Low",
                                        "Medium",
                                        "High",
                                    ].includes(
                                        taskObj.priority
                                    )
                                        ? taskObj.priority
                                        : "Medium",

                                dueDate,

                                meetingId:
                                    meeting.id,

                                userId,
                            };
                        }
                    );

                await Task.bulkCreate(
                    tasksData,
                    {
                        transaction: t,
                    }
                );
            }

            await t.commit();

            return meeting;

        } catch (error) {

            await t.rollback();

            throw error;
        }
    };

/* =========================================
   CREATE MEETING
========================================= */

const createMeeting =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                title,
                transcript,
            } = req.body;

            const userId =
                req.user.id;

            const meeting =
                await processMeeting(
                    title,
                    transcript,
                    userId
                );

            res.status(201).json({
                message:
                    "Meeting created successfully",
                meeting,
            });

        } catch (error) {

            next(error);
        }
    };

/* =========================================
   UPLOAD TRANSCRIPT
========================================= */

const uploadTranscript =
    async (
        req,
        res,
        next
    ) => {

        try {

            if (!req.file) {

                return res
                    .status(400)
                    .json({
                        message:
                            "No file uploaded. Ensure file is a .txt file.",
                    });
            }

            const transcript =
                req.file.buffer.toString(
                    "utf-8"
                );

            const userId =
                req.user.id;

            const meeting =
                await processMeeting(
                    req.file
                        .originalname,
                    transcript,
                    userId
                );

            res.status(201).json({
                message:
                    "Transcript uploaded successfully",
                meeting,
            });

        } catch (error) {

            next(error);
        }
    };

/* =========================================
   GET ALL MEETINGS
========================================= */

const getMeetings =
    async (
        req,
        res,
        next
    ) => {

        try {

            const userId =
                req.user.id;

            const meetings =
                await Meeting.findAll({

                    where: {
                        userId,
                    },

                    order: [
                        [
                            "createdAt",
                            "DESC",
                        ],
                    ],
                });

            res.status(200).json({
                meetings,
            });

        } catch (error) {

            next(error);
        }
    };

/* =========================================
   GET SINGLE MEETING
========================================= */

const getMeetingById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const meetingId =
                req.params.id;

            const userId =
                req.user.id;

            const meeting =
                await Meeting.findOne({

                    where: {
                        id: meetingId,
                        userId,
                    },

                    include: [
                        {
                            model: Task,
                        },
                    ],
                });

            if (!meeting) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Meeting not found",
                    });
            }

            res.status(200).json({
                meeting,
            });

        } catch (error) {

            next(error);
        }
    };

/* =========================================
   SEARCH MEETINGS
========================================= */

const searchMeetings =
    async (
        req,
        res,
        next
    ) => {

        try {

            const keyword =
                req.query.keyword || "";

            const userId =
                req.user.id;

            const meetings =
                await Meeting.findAll({

                    where: {

                        userId,

                        [Op.or]: [

                            {
                                title: {
                                    [Op.like]:
                                        `%${keyword}%`,
                                },
                            },

                            {
                                transcript: {
                                    [Op.like]:
                                        `%${keyword}%`,
                                },
                            },

                            {
                                summary: {
                                    [Op.like]:
                                        `%${keyword}%`,
                                },
                            },

                            {
                                keyPoints: {
                                    [Op.like]:
                                        `%${keyword}%`,
                                },
                            },

                        ],
                    },

                    order: [
                        [
                            "createdAt",
                            "DESC",
                        ],
                    ],
                });

            res.status(200).json({
                meetings,
            });

        } catch (error) {

            next(error);
        }
    };

module.exports = {
    createMeeting,
    uploadTranscript,
    getMeetings,
    getMeetingById,
    searchMeetings,
};