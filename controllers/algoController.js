// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// NPC Seeds
// Front-end will need to use JSON.parse(response.argsAndOutput) to access argsAndOutput as json objects
const seedAlgo = [
    {
        question: "Write code to print the first character in a given string that is not a duplicate.",
        hints: ["Don't suck", "Don't suck", "Don't suck"],
        difficulty: "Medium",
        argsAndOutput: '{"args": "tacocat", "output": 11}'
    },
    {
        question: "Write code to reverse a given string.",
        hints: ["Taco", "Taco", "Taco"],
        difficulty: "Easy",
        argsAndOutput: '{"args": "car", "output": true}'
    },
    {
        question: "Write code to remove the duplicate characters from a given string.",
        hints: ["Cat", "Cat", "Cat"],
        difficulty: "Hard",
        argsAndOutput: '{"args": ["tacocat", "taco", "cat"], "output": false}'
    },
    {
        question: "Write code to remove the letter e from a given string.",
        hints: ["Jeez", "Jeez", "Jeez"],
        difficulty: "Medium",
        argsAndOutput: '{"args": "oh jeez", "output": 9}'
    },
]

// Seed route for NPC characters
router.get("/seedalgo", (req, res) => {
    db.Algo.create(seedAlgo).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(result, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for all algorithms
router.get("/api/algo", (req, res) => {
    db.Algo.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for one random algorithm
router.get("/api/random", (req, res) => {
    db.Algo.find({}).then(data => {
        const randomAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(randomAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    })
});

// API route for one random hard algorithm
router.get("/api/hard", (req, res) => {
    db.Algo.find({ difficulty: "Hard" }).then(data => {
        const hardAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(hardAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});

// API route for one medium algorithm
router.get("/api/medium", (req, res) => {
    db.Algo.find({ difficulty: "Medium" }).then(data => {
        const medAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(medAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});

// API route for one easy algorithm
router.get("/api/easy", (req, res) => {
    db.Algo.find({ difficulty: "Easy" }).then(data => {
        const easyAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(easyAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});


module.exports = router;