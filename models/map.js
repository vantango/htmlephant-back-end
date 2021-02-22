const sequelize = require("sequelize")

// Create Map table with id, background image, walls, people
module.exports = (sequelize, DataTypes) => {
    const Map = sequelize.define("Map", {
        background: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        walls: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return JSON.parse(this.getDataValue("value"))
            },
            set: function (value) {
                this.setDataValue("value", JSON.stringify(value));
            }
        },
        people: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return JSON.parse(this.getDataValue("value"))
            },
            set: function (value) {
                this.setDataValue("value", JSON.stringify(value))
            }
        }

    });


    Map.associate = (models) => {
        Map.hasOne(models.State)
    };

    return Map;
}