const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name cannot be empty" },
            len: {
                args: [2, 50],
                msg: "Name must be between 2 and 50 characters in length"
            }
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Must be a valid email address" },
            notEmpty: { msg: "Email cannot be empty" }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password cannot be empty" },
            len: {
                args: [6, 255],
                msg: "Password must be at least 6 characters long"
            }
        }
    },
});

module.exports = User;