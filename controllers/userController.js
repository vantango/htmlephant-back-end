// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Express router instance
const router = express.Router()

// Handle token authentication
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
        data = jwt.verify(token, "Oh, jeez", (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}

// Signup Route
router.post("/signup", (req, res) => {
    createUser(req.body, data => {
        const token = jwt.sign({
            username: data.username,
            id: data._id
        }, "Oh, jeez", {
            expiresIn: "4h"
        });
        return res.json({ user: newUser, token })
    }).catch(err => {
        err ? res.status(500).send("IMPOSTER!") : res.send("Congrats!")
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
                id: _id
            }, "Oh, jeez", { expiresIn: "4h" });
            return res.json({ data, token });
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
    let token = false;
    if (!req.headers) {
        token = false
    } else if (!req.headers.authorization) {
        token = false;
    } else {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(403).send("We don't serve your kind here")
    } else {
        const data = jwt.verify(token, "Oh, jeez", (err, data) => {
            if (err) {
                return false;
            } else {
                return data;
            }
        });
        data ? res.json(data) : res.status(403).send("You disgust me.")
    }
    let tokenData = authenticateMe(req);
    tokenData ? res.json(tokenData) : res.status(403).send("You disgust me.")
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

