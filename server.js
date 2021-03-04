// Dependencies and server config
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Set environment variables for port
const PORT = process.env.PORT || 8080;

// Express server instance
const app = express();


// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:["https://wizards-and-whiteboards.herokuapp.com/"]
}));

// Connect to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/htmlephant", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


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



