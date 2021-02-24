// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");

// Express router instance
const router = express.Router()

// Signup Route
router.post("/signup", (req, res) => {
    db.User.create(req.body).then(data => {
        console.log(`Here's your user info: ${JSON.stringify(data.null, 2)}`);
        res.json(data)
    }).catch(err => {
        res.status(500).send(err.message);
        console.log(err)
    })
});

// Login route
router.post("/login", (req, res) => {
    db.User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            res.status(404).send("IMPOSTER!")
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
            req.session.user = {
                id: data._id,
                username: data.username
            };
            res.json(req.session.user)
        } else {
            res.status(401).send("We don't serve your kind here.")
        }
    }).catch(err => {
        err ? res.status(500).send("Oh wow look, you broke it.") : res.status(200).send("Success!")
    });
});

// Render user profile after successful login
router.get("/profile", (req, res) => {
    req.session.user ? res.render("profile", { user: req.session.user }) : res.status(401).send("IMPOSTER!")
});

// Test user login route
router.get("/vip", (req, res) => {
    req.session.user ? res.send("You belong.") : res.status(401).send("You disgust me.")
});

// Logout route 
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Goodbye.");
});

// Function to create user
async function createUser(data, cb) {
    db.User.create({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        character: data.character,
        level: 1
    }).then(user => {
        cb(user);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
}

module.exports = router;

