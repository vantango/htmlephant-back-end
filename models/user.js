// Dependencies
const bcrypt = require('bcrypt');
const sequelize = require("sequelize")

// Create Users table with id, username, password, animal choice
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        character: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Cat"
        }
    });

    // Each user has one state, which is deleted if the user is deleted
    User.associate = (models) => {
        User.hasOne(models.State), {
            onDelete: "cascade"
        }
    };

    return User;
}