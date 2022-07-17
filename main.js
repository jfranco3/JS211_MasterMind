"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess, solution) => {
  // create variables solutionArray and guessArray that each split up passed in arguement
  let solutionArray = solution.slice("");
  let guessArray = guess.slice("");

  //create a variable correctLetterLocations and set it to 0
  let correctLetterLocations = 0;

  //In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray. If the item matches, increment correctLetterLocations, and set that index in solutionArray to null
  for (let i = 0; i < solutionArray.length; i++) {
    //if the value at the index of the solution array =
    //value of index of guess array

    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }
};

const mastermind = (guess) => {
  solution = "abcd"; // Comment this out to generate a random solution
  // your code here

  //bring the guess from the console and compare it to the solutoin, letter by letter
  guess = guess.trim().toLowerCase();
  if (guess === solution) {
    console.log("You Guessed It!");
  }
  //if the guess you passed in equals the solution, return 'you guess it'
};

const getPrompt = () => {
  rl.question("guess: ", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      assert.equal(generateHint("abdc"), "2-2");
    });
    it("should generate hints if solution has duplicates", () => {
      assert.equal(generateHint("aabb"), "1-1");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
