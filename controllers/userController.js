// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");


// Express router instance
const router = express.Router()

// Signup Route
router.post("/signup", (req, res) => {
    db.User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        character: req.body.character,
        level: 1,
        health: 3
    }).then(data => {
        if (data) {
            // If user is created, assign token and send back user data
            const token = jwt.sign({
                username: data.username,
                id: data._id
            },
                config.secret,
                {
                    expiresIn: "2h"
                });
            res.json({ user: data, token })
        } else {
            // If not, respond with 404 status code
            res.status(404).send("You have no power here!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Abandon all hope, ye who enter here.")
    });
});

// Login route
router.post("/login", (req, res) => {
    db.User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            // If no user is found, respond with 404 status code
            res.status(404).send("IMPOSTER!")
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
            // If user is found, compare hashed password and token to db records
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
            // If information is incorrect, respond with 401 status code
            res.status(401).send("We don't serve your kind here.")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});


// Route to authenticate users
router.get("/vip", (req, res) => {
    // Verify JWT token
    let tokenData = authenticateMe(req);
    if (tokenData) {
        // If token is associated with a user, send back user data
        db.User.findOne({
            _id: tokenData.id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
        })
    }
});

// Route to get one user by id
router.get("/api/user/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(data => {
        // If user is found, send back user data. If not, respond with 404 status code
        data ? res.json(data) : res.status(404).send("You have no power here!")
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    })
})

// Update route to increment user level after each algorithm
router.put("/levelup/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            level: 1,
        },
        $set: {
            health: 3
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
    })
})

// Update route to decrement user level 
router.put("/leveldown/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            level: -1
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
    })
})

// Update route to decrement user health
router.put("/healthdown/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(response => {
        response.health <= 0 ? res.send("Oops, you're dead") : db.User.updateOne({
            _id: req.params.id
        }, {
            $inc: {
                health: -1
            }
        }, (err, data) => {
            err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
        })
    })

})


// Update route to reset user health to 3
router.put("/reset/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        health: 3
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    })
})

// Update route to switch user from manatee to cat
router.put("/switchtocat/:username", (req, res) => {
    db.User.updateOne({
        username: req.params.username
    }, {
        character: "Cat"
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Switched to cat!")
    })
})

// Update route to switch user from cat to manatee
router.put("/switchtomanatee/:username", (req, res) => {
    db.User.updateOne({
        username: req.params.username
    }, {
        character: "Manatee"
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Switched to manatee!")
    })
})


// Token authentication
const authenticateMe = (req) => {
    let token = false;

    if (!req.headers) {
        // If the request contains no authorization headers, return false
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        // If authorization headers are present, remove the word "Bearer" to isolate the token
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        // Compare token to db records
        data = jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    // If token matches, send back user data
    return data;
}


module.exports = router;

