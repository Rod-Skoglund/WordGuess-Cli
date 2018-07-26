// *************************************************
// Program:  Command Line (CLI) Word Guessing Game
// Author: Rod Skoglund
// File: index.js
// *************************************************

var inquirer = require("inquirer");
var Word = require("./Word.js");

// Define varables
var maxNumGuesses = 10;
var numRemainingGuesses = parseInt(maxNumGuesses);

// List of words for game
var wordList = ["Apples", "Bananas", "Pears", "abruptly", "absurd", "abyss", "affix", "askew", "avenue", 
                "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", 
                "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", 
                "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", 
                "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", 
                "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", 
                "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", 
                "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", 
                "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", 
                "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", 
                "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", 
                "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", 
                "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", 
                "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", 
                "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", 
                "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", 
                "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", 
                "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", 
                "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", 
                "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", 
                "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", 
                "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", 
                "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", 
                "zombie"];

// Get initial word for the first round of the game.
// Select/instantiate word - Randomly select a word from the above list
var nextWord = wordList[Math.floor(Math.random() * wordList.length)];
var activeWord = new Word(nextWord);
console.log(activeWord.toString());
var guessedLetters = [];

function gameStatus() {
    //check for complete word
    var wordComplete = activeWord.wordComplete();
    var outOfGuesses = (parseInt(numRemainingGuesses) < 1);

    if (wordComplete) {
        console.log("\n****************************************");
        console.log("Congrates - YOU WON!");
        console.log("The word was: ");
        activeWord.displayCompleteWord();
        console.log("****************************************\n");
    } else if (outOfGuesses) {
        console.log("\n****************************************");
        console.log("Sorry, you are out of guesses - You lost.")
        console.log("The word was: ");
        activeWord.displayCompleteWord();
        console.log("****************************************\n");
    } else {
        activeWord.toString();
        console.log("++++++++++++++++++++++++++++++++++++++++\n");
    }

    if (wordComplete || outOfGuesses) {
        inquirer.prompt([
            {
                type: "confirm",
                name: "playAgain",
                message: "Do you want to play again?"
            }
        ]).then(function(answers) {
            if (answers.playAgain) {
                numRemainingGuesses = parseInt(maxNumGuesses);
                nextWord = wordList[Math.floor(Math.random() * wordList.length)];
                activeWord = new Word(nextWord);
                guessedLetters = [];
                playGame();
            }
            else {
                console.log("****************************************");
                console.log("Thanks for playing.");
                console.log("****************************************\n");
                process.exit();
            }
        });

    } else {
        playGame();
    }
}

function playGame() {
    // ask user to guess a letter
    inquirer.prompt(
        {
          name: "nextGuess",
          message: "Guess a letter?"
        }
    ).then(function(answers) {
        var noInput = (answers.nextGuess == "");
        console.log("noInput = " + noInput);

        // Test to make sure something was entered
        if (noInput) {
            console.log("You did not enter a letter - try again\n");
        } else {
            var notAlreadyGuessed = (guessedLetters.indexOf(answers.nextGuess.toLowerCase()) < 0);

            // Ignore letters that have already been guessed
            if (notAlreadyGuessed) {
                guessedLetters.push(answers.nextGuess.toLowerCase());
                if (activeWord.inWord(answers.nextGuess)) {
                    console.log("Correct Guess!");
                    console.log(activeWord.toString());
                }
                else {
                    numRemainingGuesses--;
                    console.log("Sorry, that is not in the word.");
                    console.log("You have " + numRemainingGuesses + " incorrect guesses left");
                    console.log(activeWord.toString());
                }
            } else {
                console.log("You have already guessed that letter - try again\n");
                // console.log("You have " + numRemainingGuesses + " incorrect guesses left");
            }
        }
        gameStatus();
    });

}

playGame();
