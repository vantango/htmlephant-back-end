// Dependencies
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

// Shape our Algorithm object
const AlgoSchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    hints: {
        type: [String],
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        default: "Easy"
    },
    arguments: {
        type: String,
        required: true,
        default: "tacocat"
    },
    output: {
        type: String,
        required: true
    }
    // TODO: Figure out how to store arguments and expected output with different data types
});

const Algo = mongoose.model("Algo", AlgoSchema)
module.exports = Algo;
