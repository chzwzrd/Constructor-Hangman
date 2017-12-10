// GLOBAL VARIABLES
// ====================================================================================
// require modules
var inquirer = require('inquirer');
var Word = require('./Word');

var wordBank = ['christmas', 'holiday', 'vacation', 'santa', 'reindeer', 'snow', 'rudolph', 'elf', 'presents', 'winter', 'carols', 'lights', 'wreath', 'sleigh', 'snowman'];

var guessesLeft = 10;


// FUNCTIONS
// ====================================================================================
function generateWord() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

function displayWord() {
    currentWord = generateWord();
    console.log(currentWord);
    var underscores = [];
    for (var i = 0; i < currentWord.length; i++) {
        underscores.push('_');
    }
    console.log(underscores.join(' '));
}

function promptUser() {

}

function rightGuess() {

}

function wrongGuess() {

}

function userWin() {

}

function userLose() {

}

function checkLetter() {
    inquirer.prompt(
        {
            name: 'guess',
            type: 'input',
            message: 'Guess a letter!'
        }
    ).then((answer) => {
        // if guesses > 0
        if (guessesLeft > 0) {
            // if user's guess is correct
            if (currentWord.includes(answer.guess)) {
                // if user completes word
                if (answer.guess === currentWord) {
                    // display win message
                    console.log(`CONGRATS, YOU WON!!! The word was '${currentWord}'.`);
                    inquirer.prompt({
                        name: 'playAgain',
                        type: 'confirm',
                        message: 'Play again?'
                    }).then((answer) => {
                        if (answer.playAgain === true) {
                            displayWord();
                            checkLetter();
                        } else {
                            console.log('Sayonara~');
                        }
                    });
                } else { // if word has not been guessed
                    console.log('CORRECT!!!');
                    // display letter at appropriate index
                    currentWord.indexOf(answer.guess) = answer.guess;
                    console.log(currentWord);
                }
            } else { // if user's guess is wrong
                console.log('INCORRECT!!!');
                // decrement guesses left
                guessesLeft--;
                console.log(`${guessesLeft} remaining!!!`);
                console.log(currentWord);
            }
        } else { // if user has 0 guesses left
            console.log(`Oh no, the word was ${currentWord} ):`);
            // ask user if they would like to play again (inquirer confirm)
            inquirer.prompt({
                name: 'playAgain',
                type: 'confirm',
                message: 'Play again?'
            }).then((answer) => {
                if (answer.playAgain === true) {
                    displayWord();
                    checkLetter();
                } else {
                    console.log('Sayonara~');
                }
            });
        }
    });
}

function initGame() {
    inquirer.prompt(
        {
            name: 'startGame',
            type: 'confirm',
            message: 'Welcome to Constructor Hangman! Press enter to start playing.'
        }
    ).then((answer) => {
        if (answer.startGame === true) {
            displayWord();
            checkLetter();
        } else {
            console.log('Sayonara~');
            return;
        }
    });
}


// MAIN PROCESS
// ====================================================================================
initGame();