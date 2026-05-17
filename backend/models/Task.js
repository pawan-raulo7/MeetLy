const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
    task: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Task description cannot be empty" }
        }
    },

    owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        allowNull: true,
        defaultValue: "Medium"
    },

    status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending",
    },

    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100
        }
    },

    dueDate: {
        type: DataTypes.DATEONLY, // Since we only get YYYY-MM-DD
        allowNull: true,
    },
});

module.exports = Task;