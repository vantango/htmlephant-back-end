// Dependencies
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

// Shape our NPC object
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
    }

});

const User = mongoose.model("User", UserSchema)
module.exports = User;