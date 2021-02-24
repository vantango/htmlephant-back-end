// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// NPC Seeds
const seedAlgo = [
    {
        question: "Write code to print the first character in a given string that is not a duplicate.",
        hints: ["Don't suck", "Don't suck", "Don't suck"],
        difficulty: "Medium",
        arguments: "tacocat",
        output: "o"

    },
    {
        question: "Write code to reverse a given string.",
        hints: ["Taco", "Taco", "Taco"],
        difficulty: "Easy",
        arguments: "car",
        output: "rac"
    },
    {
        question: "Write code to remove the duplicate characters from a given string.",
        hints: ["Cat", "Cat", "Cat"],
        difficulty: "Hard",
        arguments: "tacocat",
        output: "o"
    },
    {
        question: "Write code to remove the letter e from a given string.",
        hints: ["Jeez", "Jeez", "Jeez"],
        difficulty: "Medium",
        arguments: "Oh, jeez",
        output: "Oh, jz"
    }
]

// Seed route for NPC characters
router.get("/seedalgo", (req, res) => {
    db.Algo.create(seedAlgo).then(result => {
        console.log(`Here's your algos: ${JSON.stringify(result, null, 2)}`);
        res.send("success mofo")
    }).catch(err => {
        console.log(err.message)
    });
});

// API route for all algorithms
router.get("/api/algo", (req, res) => {
    db.Algo.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`Here they all are fool: ${JSON.stringify(data, null, 2)}`)
    });
});

// API route for one random algorithm
router.get("/api/random", (req, res) => {
    db.Algo.find({}).then(data => {
        const randomAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(randomAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`This is random algo: ${JSON.stringify(randomAlgo, null, 2)}`)
    })
});

// API route for one random hard algorithm
router.get("/api/hard", (req, res) => {
    db.Algo.find({ difficulty: "Hard" }).then(data => {
        const hardAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(hardAlgo);
        console.log(`This one's hard: ${JSON.stringify(hardAlgo, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`This one's medium: ${JSON.stringify(medAlgo, null, 2)}`)
    })
});

// API route for one medium algorithm
router.get("/api/medium", (req, res) => {
    db.Algo.find({ difficulty: "Medium" }).then(data => {
        const medAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(medAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`This one's medium: ${JSON.stringify(medAlgo, null, 2)}`)
    })
});

// API route for one easy algorithm
router.get("/api/easy", (req, res) => {
    db.Algo.find({ difficulty: "Easy" }).then(data => {
        const easyAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(easyAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : console.log(`This one's easy: ${JSON.stringify(easyAlgo, null, 2)}`)
    })
});


module.exports = router;