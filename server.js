// Dependencies and server config
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const session = require('express-session');

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

// Sets up sessions for user login
app.use(session({
    secret: 'Oh, jeez.',
    resave: false,
    saveUninitialied: false,
    cookies: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));

// Define routes
const userRoutes = require("./controllers/userController");
const npcRoutes = require("./controllers/npcController");

// Use routes
app.use(npcRoutes);
app.use(userRoutes);

// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});