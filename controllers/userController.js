// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("../config/auth.js")

// Express router instance
const router = express.Router()

// Signup Route
router.post("/signup", (req, res) => {
    db.User.create(req.body).then(data => {
        console.log(`Here's your user info: ${JSON.stringify(data.null, 2)}`);

        // Creating JWT token
        const token = jwt.sign({
            username: data.username,
            id: data.id
        },
            config.secret,
            {
                expiresIn: "2h"
            });
        res.json({ user: data, token })
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
            // req.session.user = {
            //     id: data._id,
            //     username: data.username
            // };
            const token = jwt.sign({
                username: data.username,
                id: data.id
            }, config.secret,
                {
                    expiresIn: "2h"
                });
            // res.json(req.session.user)
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


// Render user profile after successful login
router.get("/profile", (req, res) => {
    tokenData ? res.render("profile", { user: tokenData }) : res.status(401).send("IMPOSTER!")

    // req.session.user ? res.render("profile", { user: req.session.user }) : res.status(401).send("IMPOSTER!")
});


// Test user login route
router.get("/vip", (req, res) => {

    // Verifying JWT token
    let tokenData = authenticateMe(req);
    tokenData ? res.send("You belong.") : res.status(401).send("You disgust me.")
    // req.session.user ? res.send("You belong.") : res.status(401).send("You disgust me.")
});



// Logout route 
router.get("/logout", (req, res) => {

    // Destroys JWT token
    jwt.destroy(tokenData)
    // req.session.destroy();
    res.send("Goodbye.");
});


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

// Function to create user
async function createUser(data, cb) {
    db.User.create({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        character: data.character,
        level: 1
    }).then(user => {
        const token = jwt.sign({
            username: user.username,
            id: user.id
        })
        cb({ user, token });
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
}

module.exports = router;

