// Dependencies
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

//Algorithm object
const AlgoSchema = new Schema({
    algorithm: {
        type: String,
        required: true,
        unique: true
    },
    question1: {
        type: String,
        required: true,
    },
    answers1: {
        type: [String],
        required: true
    },
    correctAnswer1: {
        type: String,
        required: true
    },
    question2: {
        type: String,
        required: true,
    },
    answers2: {
        type: [String],
        required: true
    },
    correctAnswer2: {
        type: String,
        required: true
    },
    question3: {
        type: String,
        required: true,
    },
    answers3: {
        type: [String],
        required: true
    },
    correctAnswer3: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        default: "Easy"
    },
    argsAndOutput: {
        type: String,
        required: true
    }
});

// Export
const Algo = mongoose.model("Algo", AlgoSchema)
module.exports = Algo;
