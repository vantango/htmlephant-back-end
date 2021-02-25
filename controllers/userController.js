// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js")

// Express router instance
const router = express.Router()

// Signup Route
router.post("/signup", (req, res) => {
    createUser(req.body, data => {
        // Creating JWT token
        const token = jwt.sign({
            username: data.username,
            id: data._id
        },
            config.secret,
            {
                expiresIn: "2h"
            });
        res.json({ user: data, token })
    }).catch(err => {
        err ? res.status(500).send("Details of your incompetence do not interest me.") : res.status(200).send("Abandon all hope, ye who enter here.")
    });

});

// Login route
router.post("/login", (req, res) => {
    db.User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            res.status(404).send("IMPOSTER!")
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
            const token = jwt.sign({
                username: data.username,
                id: data._id
            },
                config.secret,
                {
                    expiresIn: "2h"
                });
            res.json({
                user: data, token
            })
        } else {
            res.status(401).send("We don't serve your kind here.")
        }
    }).catch(err => {
        err ? res.status(500).send("Oh wow look, you broke it.") : res.status(200).send("Success!")
    });
});


// Test user login route
router.get("/vip", (req, res) => {

    // Verifying JWT token
    let tokenData = authenticateMe(req);
    tokenData ? res.send("You belong.") : res.status(401).send("You disgust me.")
    // req.session.user ? res.send("You belong.") : res.status(401).send("You disgust me.")
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

// Token authentication
const authenticateMe = (req) => {
    let token = false;

    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}

module.exports = router;

