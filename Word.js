// *************************************************
// Program:  Command Line (CLI) Word Guessing Game
// Author: Rod Skoglund
// File: Word.js
// *************************************************

var Letter = require("./Letter.js");

function createWord(theWord) {
    var word = [];
    for (var i = 0; i < theWord.length; i++) {
        word[i] = new Letter(theWord[i]);
    }
    return(word);
}

var Word = function(aWord) {
    this.word = createWord(aWord),        
    this.toString = function() {
        var theWord = "";
        for (var j = 0; j < this.word.length; j++) {
            theWord = theWord + this.word[j].displayChar() + " ";
        }
        return(theWord);
    },
    this.inWord = function(aGuess) {
        var correctGuess = false;
        for (var g = 0; g < this.word.length; g++) {
            var isCorrect = this.word[g].guess(aGuess);
            correctGuess = (correctGuess || isCorrect);
        }
        return(correctGuess);
    },
    this.wordComplete = function() {
        var allLettersGuessed = true;
        for (var k = 0; k < this.word.length; k++) {
            allLettersGuessed = (allLettersGuessed && this.word[k].isGuessed);
        }
        return(allLettersGuessed);
    },
    this.displayCompleteWord = function() {
        var theWord = ""
        for (var n = 0; n < this.word.length; n++) {
            theWord = theWord + this.word[n].theChar + " ";
        }
        console.log(theWord);
    };
};

module.exports = Word;
