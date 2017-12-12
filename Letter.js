// create Letter constructor
function Letter(letter) {
    this.letter = letter;
    this.hasBeenGuessed = false;
}

Letter.prototype.displayLetter = function() {
    if (this.hasBeenGuessed) {
        return this.letter;
    } else {
       return '_ ';
    }
}

// export module
module.exports = Letter;
