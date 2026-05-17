const User = require("./User");
const Meeting = require("./Meeting");
const Task = require("./Task");

// User ↔ Meeting
User.hasMany(Meeting, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Meeting.belongsTo(User, {
    foreignKey: "userId",
});

// Meeting ↔ Task
Meeting.hasMany(Task, {
    foreignKey: "meetingId",
    onDelete: "CASCADE",
});

Task.belongsTo(Meeting, {
    foreignKey: "meetingId",
});

// User ↔ Task
User.hasMany(Task, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Task.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = {
    User,
    Meeting,
    Task,
};