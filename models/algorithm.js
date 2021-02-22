const Sequelize = require("sequelize")

// Create Algorithm table with id, question, hints, function arguments, expected outputs, difficulty
module.exports = (sequelize, DataTypes) => {
    const Algorithm = sequelize.define("Algorithm", {
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        hints: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return JSON.parse(this.getDataValue("value"))
            },
            set: function (value) {
                this.setDataValue("value", JSON.stringify(value));
            }
        },
        argsAndOutput: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return JSON.parse(this.getDataValue("value"))
            },
            set: function (value) {
                this.setDataValue("value", JSON.stringify(value))
            }
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "easy"
        }
    });

    return Algorithm;
}