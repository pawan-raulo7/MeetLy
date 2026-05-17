const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getTasks,
    updateTask,
} = require("../controllers/taskController");

const updateTaskSchema = Joi.object({
    progress: Joi.number().min(0).max(100),
    status: Joi.string().valid("pending", "in-progress", "completed"),
    priority: Joi.string().valid("Low", "Medium", "High"),
}).min(1);

// Get all tasks
router.get("/", authMiddleware, getTasks);

// Update task
router.patch("/:id", authMiddleware, validate(updateTaskSchema), updateTask);

module.exports = router;