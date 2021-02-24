// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// NPC Seeds
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
        dialogue: ["Blah blah drums", "Blah blah dog", "You got this!"]
    },
    {
        name: "Denis",
        dialogue: ["...", "*appears silently*", "MAC AND CHEESE!"]
    }
]

// Seed route for NPC characters
router.get("/seednpc", (req, res) => {
    db.Npc.create(seedData).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(seedData, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for NPC characters
router.get("/api/npc", (req, res) => {
    db.Npc.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

module.exports = router;

