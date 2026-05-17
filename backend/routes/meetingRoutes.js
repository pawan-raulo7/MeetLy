const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createMeeting,
    uploadTranscript,
    getMeetings,
    getMeetingById,
    searchMeetings,
} = require("../controllers/meetingController");

const createMeetingSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    transcript: Joi.string().required(),
});

router.post("/", authMiddleware, validate(createMeetingSchema), createMeeting);

router.post(
    "/upload",
    authMiddleware,
    upload.single("transcript"),
    uploadTranscript
);

router.get("/", authMiddleware, getMeetings);

router.get("/search", authMiddleware, searchMeetings);

router.get("/:id", authMiddleware, getMeetingById);

module.exports = router;