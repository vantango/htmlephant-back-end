// Dependencies and server config
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const session = require('express-session');

// Set environment variables for port
const PORT = process.env.PORT || 8080;

// Express server instance
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
const algoRoutes = require("./controllers/algoController");

// Use routes
app.use(npcRoutes);
app.use(userRoutes);
app.use(algoRoutes);

// In case anyone tries to visit the deployed server
app.get("/", (req, res) => {
    res.send("Go away, I'm trying to eat my mac and cheese.")
})

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});