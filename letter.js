// import word module
var Word = require('./word');

// create Letter constructor
function Letter(guessesLeft) {
    this.guessesLeft = guessesLeft;
}

Letter.prototype.newWord = function() {
    var xmasBank = ['christmas', 'holiday', 'vacation', 'santa', 'reindeer', 'snow', 'rudolph', 'elf', 'presents', 'winter', 'carols', 'lights', 'wreath', 'sleigh', 'snowman'];
    var newWord = new Word(xmasBank);
}

Letter.prototype.checkLetter = function() {
    inquirer.prompt(
        {
            name: 'userGuess',
            type: 'input',
            message: 'Guess a letter!'
        }
    ).then((answer) => {
        // if guesses > 0
        if (this.guessesLeft > 0) {
            // if user's guess is correct
            if (newWord.randomWord.includes(answer.userGuess)) {
                // if user guesses word
                if (answer.userGuess === newWord.randomWord) {
                    // display win message
                    console.log(`CONGRATS, YOU WON!!! The word was '${newWord.randomWord}'.`);
                    inquirer.prompt({
                        name: 'playAgain',
                        type: 'confirm',
                        message: 'Play again?'
                    }).then((answer) => {
                        if (answer.playAgain === true) {
                            this.newWord();
                            this.checkLetter();
                        } else {
                            console.log('Sayonara~');
                        }
                    });
                } else { // if word has not been guessed
                    console.log('CORRECT!!!');
                    // display letter at appropriate index
                    newWord.randomWord.indexOf(answer.userGuess) = answer.userGuess;
                    console.log(newWord.randomWord);
                }
            } else { // if user's guess is wrong
                console.log('INCORRECT!!!');
                // decrement guesses left
                guessesLeft--;
                console.log(`${guessesLeft} remaining!!!`);
                console.log(newWord.randomWord);
            }
        } else {
            // ask user if they would like to play again (inquirer confirm)
            inquirer.prompt({
                name: 'playAgain',
                type: 'confirm',
                message: 'Play again?'
            }).then((answer) => {
                if (answer.playAgain === true) {
                    this.newWord();
                    this.checkLetter();
                } else {
                    console.log('Sayonara~');
                }
            });
        }
    });
}

// export module
module.exports = Letter;