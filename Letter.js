// *************************************************
// Program:  Command Line (CLI) Word Guessing Game
// Author: Rod Skoglund
// File: Letter.js
// *************************************************

var Letter = function(char) {
    this.theChar = [char],
    this.isGuessed = false,
    this.displayChar = function() {
        if (this.isGuessed) {
            return(this.theChar);
        }
        else {
            return(["_"]);
        }
    },
    this.guess = function(aChar) {
        var isEqual = (aChar[0].toLowerCase() == this.theChar[0].toLowerCase());
        this.isGuessed = (isEqual || this.isGuessed);

        return(isEqual);
    }
}

module.exports = Letter;

