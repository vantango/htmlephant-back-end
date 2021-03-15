// Dependencies 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Cors config
const whitelist = ["https://wizards-and-whiteboards.herokuapp.com", "http://localhost:3000"]

const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET, HEAD, POST, PUT"
}

// Environment variables
// Port
const PORT = process.env.PORT || 8080;

// Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/htmlephant", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Express server instance
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRoutes = require("./controllers/userController");
app.use(userRoutes);

const npcRoutes = require("./controllers/npcController");
app.use(npcRoutes);

const algoRoutes = require("./controllers/algoController");
app.use(algoRoutes);

// Lovely greeting for anyone who tries to visit the deployed server
app.get("/", (req, res) => {
    res.send("Go away, I'm trying to eat my mac and cheese.")
})

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



