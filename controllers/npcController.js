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

// Some fake NPCs to throw them off the scent
const fakeData = [
    {
        name: "Luther",
        dialogue: ["Like sands through the hourglass, my hopes for your success dwindle by the second.", "As Sun Tzu said in his 'Art of War,'...*sigh* Never mind. ", "The details of your incompetence do not interest me."]
    },
    {
        name: "Eli",
        dialogue: ["We don't get too many of your kind around these parts.", "Did I ever tell you I was struck by lightning seven times?", "Oh, hey, it's you! Didn't think I'd be seeing you again. Most that go in there don't come out again."]
    },
    {
        name: "The Great Agatha",
        dialogue: ["Come closer, young one. I do not harm those who have not yet displeased me.", "Fool! Your arrogance will ensure you rot along with all those who came before you!", "*horrible screaming*"]
    },
    {
        name: "Denise",
        dialogue: ["...", "*appears silently*", "SHHH. It's almost time."]
    }
]


// Seed route for NPC real characters
router.get("/seednpc", (req, res) => {
    db.Npc.create(seedData).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(seedData, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// Seed route for fake NPC characters
router.get("/faker", (req, res) => {
    db.Npc.create(fakeData).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(fakeData, null, 2)}`)
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

