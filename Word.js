// require Letter constructor
var Letter = require('./Letter');

// create Word constructor to represent current word user is guessing
var Word = function() {
    this.currentWord = this.getWord();
};

Word.prototype.getWord = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

Word.prototype.displayWord = function(arr) {
    var underscores = [];
    for (var i = 0; i < arr.length; i++) {
        underscores.push('_');
    }
    console.log(underscores.join(' '));
}

// export module
module.exports = Word;
