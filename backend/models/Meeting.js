const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Meeting = sequelize.define("Meeting", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Title cannot be empty" },
            len: [1, 255]
        }
    },

    transcript: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Transcript cannot be empty" }
        }
    },

    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    keyPoints: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

User.hasMany(Meeting, {
    foreignKey: "userId",
});

Meeting.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = Meeting;