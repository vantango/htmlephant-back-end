// Dependencies
const mongoose = require("mongoose");

// Schema instance
const Schema = mongoose.Schema;

//NPC object
const NpcSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Manatee Joe"
    },
    flavorDialogue: {
        type: [[String]],
        required: true,
    },
    usefulDialogue: {
        type: [[String]],
        required: true,
    }
});

// Export
const Npc = mongoose.model("Npc", NpcSchema)
module.exports = Npc;