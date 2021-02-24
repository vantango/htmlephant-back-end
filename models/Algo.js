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
    argsAndOutput: {
        type: String,
        required: true
    }
});

const Algo = mongoose.model("Algo", AlgoSchema)
module.exports = Algo;
