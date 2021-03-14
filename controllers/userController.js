// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const mongo = require("mongoose");

// Express router instance
const router = express.Router()

// Signup Route
router.post("/signup", (req, res) => {
    db.User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        character: req.body.character,
        level: 1
    }).then(data => {
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
        err ? res.status(500).send(`Due to your idiocy, ${err}`) : res.status(200).send("Abandon all hope, ye who enter here.")
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
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    });
});


// Route to authenticate users
router.get("/vip", (req, res) => {
    // Verifying JWT token
    let tokenData = authenticateMe(req);
    if (tokenData) {
        db.User.findOne({
            _id: tokenData.id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
        })
    }
});

// Route to get one user by id
router.get("/api/user/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(data => {
        res.json(data)
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
            health: 10
        }
    }, (err, data) => {
        err ? res.send(err) : res.json(data)
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
        err ? res.status(500).send(`Due to your idiocy, ${err}`) : res.json(data)
    })
})

// Update route to decrement user health by 5
router.put("/healthdown/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            health: -5
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err}`) : res.json(data)
    })
})


// Update route to reset user level to 1
router.put("/reset/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        level: 1
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
        console.log(`Error switching to cat:`, err);
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
        console.log(`Error switching to manatee:`, err);
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Switched to manatee!")
    })
})


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

