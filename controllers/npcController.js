// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// Create NPC
const seedData = [
    {
        name: "Joe",
        dialogue: ["Oh, jeez.", "I love cats I love every kind of cat", "Always be coding."]
    },
    {
        name: "Aslan",
        dialogue: ["Hey, hey!", "For the love of god", "Keep up the good work!"]
    },
    {
        name: "Zac",
        dialogue: ["Blah blah drums", "Blah blah dog", "Wow get a catchphrase"]
    },
    {
        name: "Denis",
        dialogue: ["mac and cheese", "Mac and Cheese.", "MAC AND CHEESE!"]
    }
]

router.get("/seednpc", (req, res) => {
    db.Npc.create(seedData).then(result => {
        console.log(`Here's your npcs: ${JSON.stringify(result, null, 2)}`);
        res.send("success mofo")
    }).catch(err => {
        console.log(err.message)
    })
});

module.exports = router;

