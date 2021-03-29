// Dependencies
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

//User object
const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: "What do we call you, friend?"
    },
    password: {
        type: String,
        trim: true,
        validate: [({ length }) => length >= 8, "Oh c'mon, your password should be longer that THAT."]
    },
    character: {
        type: String,
        required: true,
        default: "Cat"
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    health: {
        type: Number,
        required: true,
        min: [0, "Oops, you're dead."]
    },
    keys: {
        type: Number,
        required: true,
        max:[3, "Too many keys!"]
    }

});

// Export
const User = mongoose.model("User", UserSchema)
module.exports = User;

