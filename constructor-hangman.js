// GLOBAL VARIABLES
// ====================================================================================
// require modules
    // inquirer
var inquirer = require('inquirer');
    // Word constructor
var Word = require('./word');
    // Letter constructor
var Letter = require('./letter');


// FUNCTIONS
// ====================================================================================
function initGame() {
    inquirer.prompt(
        {
            name: 'startGame',
            type: 'confirm',
            message: 'Welcome to Constructor Hangman! Press enter to start playing.'
        }
    ).then((answer) => {
        if (answer.startGame === true) {
            currentWord.newWord();
        } else {
            console.log('Sayonara~');
            return;
        }
    });
}


// MAIN PROCESS
// ====================================================================================
initGame();