const sequelize = require("sequelize")

// Create State table with id, character location, user keys, user levels, user id, map id 
module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define("State", {
        characterLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        characterKeys: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        characterLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    // Each user has one state, which is deleted if the user is deleted
    State.associate = (models) => {
        State.belongsTo(models.User), {
            foreignKey: {
                name: "UserId",
                allowNull: false
            }
        };
        State.belongsTo(models.Map), {
            foreignKey: {
                name: "MapId",
                allowNull: false
            }
        }
    };

    return State;
}