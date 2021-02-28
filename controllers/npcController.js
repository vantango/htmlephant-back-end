// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// NPC Seeds
const seedData = [
    {
        name: "Joe",
        flavorDialogue: ["Oh, jeez.", "I love cats I love every kind of cat", "Always be coding."],
        usefulDialogue: ["Welcome! You are entering a world of magic---well, magic that is made up of data, computer science and algorithms. I swear, it's a lot cooler than it sounds. I am Joe, the Dev Wizard, and this is Castle Full Stack. One day, perhaps you will possess all the knowledge held in these walls, but for now, let's focus on one thing: algorithms. Seek out the Wizard Assistants in the castle, and they will share their coding knowledge with you. Each Wiz will ask you a series of questions. Once you complete all the questions, you will get a salmon. Once you have three salmon, come back to see me to test what you've learned. Good luck, and ABC (Always Be Coding)!", "Oh, jeez, you again? I said come back when you have THREE salmon. Get outta here.", "I had my doubts, but you have earned the right to 'Enscribe' your code upon the tablet below. But be warned! If you do not follow my directions, your answer will be wrong and you shall be doomed forevermore to wander the Land of Sam's Canned Ham Yams. Now gaze upon the tablet, and follow my rules three: Do not wrap your function in curly brackets, do not write 'function', and whatever you do, DO NOT type '=>'. If you do, it will break, and I am just a sprite, so there is nothing I can do to help you. If your challenge is 'Write code to add two numbers together', your answer should be 'return a+b'.", "You did it! Snaps for you, and remember, Always Be Coding.", "Not quite. I'm muting the room so you can try again."]

    },
    {
        name: "Aslan",
        flavorDialogue: ["Hey, hey!", "For the love of god", "Keep up the good work!"],
        usefulDialogue: ["Hey, hey! Welcome to my room. Would you like a salmon? I'd love to give it to you, but first I have a very important question.", "You got it! Go and see the rest of the team, and keep up the good work!", "C'mon, man, you know better than THAT. No salmon for you."]
    },
    {
        name: "Zac",
        flavorDialogue: ["Howdy!", "Here's some pictures of my dog!", "Wanna try out my new sticks?"],
        usefulDialogue: ["Oh hey, didn't hear you come in! I was busy pounding my skins! Anyway, you're just in time. I've got a salmon for you, but Billie--you know my dog, Billie? She ate your salmon. Answer this question, and she'll give it back.", "You got it right! Hi-hats off to you, man. If you go see Denis next, make sure he's had his mac and cheese or you're not gonna like what happens.", "Ah, not quite. Gosh, now I'm gonna have to take Billie to the vet."]
    },
    {
        name: "Denis",
        flavorDialogue: ["...", "*appears silently*", "You know, it is what it is."],
        usefulDialogue: ["*appears silently* I've got a question for you. You might get a salmon out of it, if you play your cards right.", "Great work! Here's your salmon. Don't believe everything you hear about my mac and cheese.", "That's not how this works. My mac and cheese is cold now."]
    }
]

// Some fake NPCs to throw them off the scent
const fakeData = [
    {
        name: "Luther",
        flavorDialogue: ["Like sands through the hourglass, my hopes for your success dwindle by the second.", "As Sun Tzu said in his 'Art of War,'...*sigh* Never mind. ", "The details of your incompetence do not interest me."],
        usefulDialogue: ["Welcome! You are entering a world of magic---well, magic that is made up of data, computer science and algorithms. I swear, it's a lot cooler than it sounds. I am Luther, the Dev Wizard, and this is Castle Full Stack. One day, perhaps you will possess all the knowledge held in these walls, but for now, let's focus on one thing: algorithms. Seek out my Assistants in the castle, and they will share their coding knowledge with you. Each will ask you a series of questions. Once you complete all the questions, you will get a key. Once you have three keys, come back to see me to test what you've learned. Good luck!", "You have not obtained sufficient knowledge. Get out of my sight.", "I had my doubts, but you have earned the right to 'Enscribe' your code upon the tablet below. But be warned! If you do not follow my directions, your answer will be wrong and you shall be doomed forevermore to wander the Valley of Lost Closing Parentheses. Now gaze upon the tablet, and follow my rules three: Do not wrap your function in curly brackets, do not write 'function', and whatever you do, DO NOT type '=>'. If you do, it will break, and there is nothing I can do to protect you. If your challenge is 'Write code to add numbers a and b together', your answer should be 'return a+b'.", "Despite your idiocy, you have conquired all my challenges. You live to walk another day, and for the love of god, don't waste it.", "I knew you were unworthy of the Wisdom of Castle Full Stack! Begone! Away to the Valley of Lost Closing Parentheses with you!"]
    },
    {
        name: "Eli",
        flavorDialogue: ["We don't get too many of your kind around these parts.", "Did I ever tell you I was struck by lightning seven times?", "Oh, hey, it's you! Didn't think I'd be seeing you again. Most that go in there don't come out again."],
        usefulDialogue: ["Howdy there, my friend! Nice to see you again! I got a question for ya.", "Hey, nice work! Here's your key. It's been real nice talking to you! Good luck out there!", "You're not gonna make it through the night in this here castle with answers like THAT."]
    },
    {
        name: "The Great Agatha",
        flavorDialogue: ["Come closer, young one. I do not harm those who have not yet displeased me.", "Fool! Your arrogance will ensure you rot along with all those who came before you!", "*horrible screaming*"],
        usefulDialogue: ["Good evening. Do not look upon me, for your fate rests only in your own hands. Before you lies a challenge. Answer it correctly, and you shall obtain a key. Answer it incorrectly, and the consequences are too dire to speak of.", "You have prevailed! As promised, your key. Tread carefully and you may see the light of day again.", "FOOL! Away with you, and I hope you enjoy the screams of all those who have failed before you!"]
    },
    {
        name: "Denise",
        flavorDialogue: ["...", "*appears silently*", "SHHH. It's almost time."],
        usefulDialogue: ["It's time. Do you know the answer?", "You have guessed correctly. You may express your joy through tears.", "Incorrect. Bow to me as I exit."]
    }
]


// Seed route for NPC real characters
router.get("/seednpc", (req, res) => {
    db.Npc.create(seedData).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(seedData, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// Seed route for fake NPC characters
router.get("/faker", (req, res) => {
    db.Npc.create(fakeData).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(fakeData, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for NPC characters
router.get("/api/npc", (req, res) => {
    db.Npc.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

module.exports = router;

