// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// Algo Seeds
const seedAlgo = [
    {
        algorithm: "Write code to print the first character in a given string that is not a duplicate.",
        question1: "Why am I doing this?",
        answers1: ["Don't suck", "Don't suck", "Don't suck"],
        correctAnswer1: "Don't suck",
        question2: "Why am I doing this?",
        answers2: ["Don't suck", "Don't suck", "Don't suck"],
        correctAnswer2: "Don't suck",
        question3: "Why am I doing this?",
        answers3: ["Don't suck", "Don't suck", "Don't suck"],
        correctAnswer3: "Don't suck",
        difficulty: "Medium",
        argsAndOutput: '{"args": "tacocat", "output": 11}'
    },
    {
        algorithm: "Write code to reverse a given string.",
        question1: "How do you split a string into an array?",
        answers1: ["Use the .splice() method", "Ask it nicely", "Use the .split() method"],
        correctAnswer1: "Use the .split() method",
        question2: "Which method removes the last element in an array?",
        answers2: ["The .shift() method", "The .pop() method", "Concatenation"],
        correctAnswer2: "The .pop() method",
        question3: "What is the correct syntax for a for loop?",
        answers3: ["for(let i=0; i<=array.length; i++){<do something>}", "for(const i=0; i>array.length; i++){<do something>}", "while(nachos=notReady){<dosomething>}"],
        correctAnswer3: "for(let i=0; i<=array.length; i++){<do something>}",
        difficulty: "Easy",
        argsAndOutput: '{"args": "car", "output": "rac"}'
    },
    {
        algorithm: "Write code to remove the duplicate characters from a given string.",
        question1: "What is the best animal?",
        answers1: ["Cat", "Cat", "Cat"],
        correctAnswer1: "Cat",
        question2: "What is the best animal?",
        answers2: ["Cat", "Cat", "Cat"],
        correctAnswer2: "Cat",
        question3: "What is the best animal?",
        answers3: ["Cat", "Cat", "Cat"],
        correctAnswer3: "Cat",
        difficulty: "Hard",
        argsAndOutput: '{"args": ["tacocat", "taco", "cat"], "output": false}'
    },
    {
        algorithm: "Write code to remove the letter e from a given string.",
        question1: "How do I feel right now?",
        answers1: ["Jeez", "Jeez", "Jeez"],
        correctAnswer1: "Jeez",
        question2: "How do I feel right now?",
        answers2: ["Jeez", "Jeez", "Jeez"],
        correctAnswer2: "Jeez",
        question3: "How do I feel right now?",
        answers3: ["Jeez", "Jeez", "Jeez"],
        correctAnswer3: "Jeez",
        difficulty: "Medium",
        argsAndOutput: '{"args": "oh jeez", "output": 9}'
    },
]

// Seed route for algorithms
router.get("/seedalgo", (req, res) => {
    db.Algo.insertMany(seedAlgo).then(result => {
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
