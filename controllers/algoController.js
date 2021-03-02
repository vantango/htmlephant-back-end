// Dependencies
const express = require("express");
const db = require("../models");

// Express router instance
const router = express.Router()

// Algo Seeds
const seedAlgo = [
    {
        algorithm: "Write code to print the first character in a given string that is not a duplicate.",
        question1: "A common whiteboard prompt will ask you to find the first NON-repeating character in a string. For example, I could ask you to find the first non-repeating letter in the string 'tacocat'. If the first thing I need to do is iterate through the string, what method would be best?",
        answers1: ["for (let i = 0; i<string.length; i++", "i=map(string.length)", "(console.log(string.indexOf('o')"],
        correctAnswer1: "for (let i = 0; i<string.length; i++",
        question2: "So you need a 'for loop' to return the first non-repeating character in a string, huh? I used to bullseye womp rats with a 'for loop' in my T-16. Good times! Anyway, a good method to use is IndexOf(). 'IndexOf' returns the first index at which a given element can be found in an array, or -1 if it's not in the array. Given the array: const food =['taco', 'burger', 'pizza', 'spaghetti'], the output of: console.log(food.indexOf('pizza') would be 2, because 'pizza' is the third item in the array. *Remember Array indices start at zero (0)*. Given the same 'food' array, at what index would 'burritos' be returned?",
        answers2: [0, 5, -1],
        correctAnswer2: -1,
        question3: "Are these qustions making you feel 'loopy'? Don't give up! You've got two pieces of the puzzle, let's bring in a third and round out this triangle. To get the first non-repeating letter of the string, we know we can write a function that uses the 'for loop' and 'indexOf' methods. We can then apply conditional logic to see if the indexOf the character in the string is present. For example, how could you write a function that checks if the first letter in the string 'tacocat' is 't'?",
        answers3: ["if (string.indexOf(t)== 0{ return true}", "if (string.indexOf(1) == t){ return true}", "if(string.indexOf(i)==0){return true}"],
        correctAnswer3: "if (string.indexOf(t)== 0{ return true}",
        difficulty: "Medium",
        argsAndOutput: '{"args": "banana", "output": "b"}'
    },
    {
        algorithm: "Write code to reverse a given string.",
        question1: "How do you split a string into an array?",
        answers1: ["Use the .splice() method", "Ask it nicely", "Use the .split() method"],
        correctAnswer1: "Use the .split() method",
        question2: "Which method removes the last element in an array?",
        answers2: ["The .shift() method", "The .pop() method", "Concatenation"],
        correctAnswer2: "The .pop() method",
        question3: "What is the correct syntax for a for loop?",
        answers3: ["for(let i=0; i<=array.length; i++){<do something>}", "for(const i=0; i>array.length; i++){<do something>}", "while(nachos=notReady){<dosomething>}"],
        correctAnswer3: "for(let i=0; i<=array.length; i++){<do something>}",
        difficulty: "Easy",
        argsAndOutput: '{"args": "car", "output": "rac"}'
    },
    {
        algorithm: "Write code to remove the duplicate characters from a given string.",
        question1: "What is the best animal?",
        answers1: ["Cat", "Cat", "Cat"],
        correctAnswer1: "Cat",
        question2: "What is the best animal?",
        answers2: ["Cat", "Cat", "Cat"],
        correctAnswer2: "Cat",
        question3: "What is the best animal?",
        answers3: ["Cat", "Cat", "Cat"],
        correctAnswer3: "Cat",
        difficulty: "Hard",
        argsAndOutput: '{"args": ["tacocat", "taco", "cat"], "output": false}'
    },
    {
        algorithm: "Write code that examines two arrays then creates a new array based on the values that appear only once in either original array.",
        question1: "Most of the time, comparison is the thief of joy, but when coding, you may be asked to compare the values of two different arrays in order to bring joy to recruiters. This would be a lot easier if we wrote a function that expected the values of two arrays. What would that look like?",
        answers1: ["const diffArray()=[a,b,c]+[x,y,z]", "function diffArray([a,b,c],[x,y,z]){}", "var diffArray=function(array1, array2)"],
        correctAnswer1: "function diffArray([a,b,c],[x,y,z]){}",
        question2: "Whoa, that is an intense look. You must be looking at two arrays and thinking about how you can compare them and return only the unique values as a new array. Yeah, I'd know that look anywhere. Don't think too hard because could use a nice old 'for loop' to solve this problem. If you created a new variable equal to an empty array, you could compare array1 and array2 to each other, then use the push method to put your results in the new, empty array. Check this example: for (let index = 0; index < array2.length; j++) { if (array1.indexOf(array2[j]) < 0) {newArray.push(array2[j]); This pushes the values specific to array2 to a new array after checking them against the values of array1. How would you write the expression that pushes the values of array1 after checking them against array 2?",
        answers2: ["if(array2===array1){return newArray.push(array1)}", "for (array2.indexOf(array1){newArray.push(indexOf.array1)", "if (arr2.indexOf(arr1[j]) < 0) { newArr.push(arr1[j])"],
        correctAnswer2: "if (arr2.indexOf(arr1[j]) < 0) { newArr.push(arr1[j])",
        question3: "You're using a 'for loop' to check array values? How quaint. There different ways to solve the same algorithm, and the best solutions use the best tools for the job. There is an awesome method called 'filter' that makes comparing arrays a breeze. The filter method takes in an array, checks the values within, and returns a specified value, like so: newArray = oldArray.filter((item) =>{ return item > 4 }). This filter is looking for values in the array called (items) that are greater than 4. Given this problem: var array =[8,2,9,3, 5], how would you write a filter function that ony looks for values less than 6?",
        answers3: ["var newArray = array.filter((item) => { return (item + 6)", "var newArray = array.filter((item) => {return (item <6)", "var newArray = array.filter((<6) => { return (item)"],
        correctAnswer3: "Jeez",
        difficulty: "Medium",
        argsAndOutput: '{"args": ['pizza','cat','puppy','calculator'],['pizza','manatee','calculator'], "output": ['cat','manatee']}'
    },
]

// Seed route for algorithms
router.get("/seedalgo", (req, res) => {
    db.Algo.insertMany(seedAlgo).then(result => {
        res.send(`Congratulations! You have created: ${JSON.stringify(result, null, 2)}`)
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for all algorithms
router.get("/api/algo", (req, res) => {
    db.Algo.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    });
});

// API route for one random algorithm
router.get("/api/random", (req, res) => {
    db.Algo.find({}).then(data => {
        const randomAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(randomAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Success!")
    })
});

// API route for one random hard algorithm
router.get("/api/hard", (req, res) => {
    db.Algo.find({ difficulty: "Hard" }).then(data => {
        const hardAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(hardAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});

// API route for one medium algorithm
router.get("/api/medium", (req, res) => {
    db.Algo.find({ difficulty: "Medium" }).then(data => {
        const medAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(medAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});

// API route for one easy algorithm
router.get("/api/easy", (req, res) => {
    db.Algo.find({ difficulty: "Easy" }).then(data => {
        const easyAlgo = data[Math.floor(Math.random() * data.length)];
        res.json(easyAlgo);
    }).catch(err => {
        err ? res.status(500).send(err.message) : res.status(200).send("Here ya go!")
    })
});


module.exports = router;
