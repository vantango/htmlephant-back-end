// Dependencies and server config
const express = require("express");
const db = require("./models");
const sequelize = require("sequelize")

const PORT = process.env.port || 8080;

const app = express();

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Oh, you want some stuff? Here's some stuff.")
})

// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    })
});