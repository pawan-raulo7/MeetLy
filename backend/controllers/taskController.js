const Task = require("../models/Task");

const getTasks = async (req, res, next) => {
    try {
        // Get logged-in user ID
        const userId = req.user.id;

        // Fetch tasks
        const tasks = await Task.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const { progress, status, priority } = req.body;

        // Get logged-in user ID
        const userId = req.user.id;

        // Find task
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId,
            },
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // Update fields
        if (progress !== undefined) {
            task.progress = progress;
        }

        if (status) {
            task.status = status;
        }

        if (priority) {
            task.priority = priority;
        }

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    updateTask,
};