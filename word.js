// create Word constructor to represent current word user is guessing
function Word(wordBank) {
    this.wordBank = wordBank;
    this.randomWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
}

Word.prototype.displayNewWord = function() {
    var underscores = [];
    for (var i = 0; i < this.randomWord.length; i++) {
        underscores.push('_');
    }
    console.log(underscores.join(' '));
}

// export module
module.exports = Word;