// Dependencies
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

// Shape our NPC object
const NpcSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Manatee Joe"
    },
    dialogue: {
        type: [String],
        required: true,
        default: ["Oh, jeez.", "For the love of god!", "Sam's Canned Ham Yams"]
    }
});

const Npc = mongoose.model("Npc", NpcSchema)
module.exports = Npc;