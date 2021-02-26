// Dependencies and server config
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");



const PORT = process.env.port || 8080;

const app = express();

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/htmlephant", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Routes
app.get("/", (req, res) => {
    res.send("Oh, you want some stuff? Here's some stuff.")
})

// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});