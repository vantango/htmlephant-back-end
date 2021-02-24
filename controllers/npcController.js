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
        res.send("Success!")
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`Here's your npcs: ${JSON.stringify(result, null, 2)}`);
    });
});

// API route for NPC characters
router.get("/api/npc", (req, res) => {
    db.Npc.find({}).then(data => {
        console.log(`Here they all are fool: ${JSON.stringify(data, null, 2)}`);
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.send("Success!")
    });
});

module.exports = router;

