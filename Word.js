// require modules
var inquirer = require('inquirer');
var Letter = require('./Letter');

// create Word constructor to represent current word user is guessing
var Word = function(word) {
    this.currentWord = word;
    this.letters = [];
    this.currentGuesses = [];
};

Word.prototype.splitWord = function() {
    for (var i = 0; i < this.currentWord.length; i++) {
        this.letters.push(new Letter.letter(this.word[i]));
    }
};

Word.prototype.guessedWord = function() {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].hasBeenGuessed) {
            return false;
        } else {
            return true;
        }
    }
};

Word.prototype.findLetter = function(letter) {
    if (this.currentGuesses.includes(letter)) {
        return chalk.cyan(`\n\tYou already guessed ${letter}!`);
    } else {
        this.currentGuesses.push(letter);
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i] === letter) {
                this.letters[i].hasBeenGuessed = true;
            }
        }
    }
};

Word.prototype.displayWord = function() {
    var wordDisplay = '';
    for (var i = 0; i < this.letters.length; i++) {
        wordDisplay += this.letters[i].displayLetter();
    }
}

// export module
module.exports = Word;
