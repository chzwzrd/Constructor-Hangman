// GLOBAL VARIABLES
// ====================================================================================
// require modules
var inquirer = require('inquirer');
var chalk = require('chalk');
var Word = require('./Word');

var wordBank = ['christmas', 'holiday', 'vacation', 'santa', 'reindeer', 'snow', 'rudolph', 'elf', 'presents', 'winter', 'carols', 'lights', 'wreath', 'sleigh', 'snowman'];

var guessesLeft = 10;
var currentGuesses = [];


// FUNCTIONS
// ====================================================================================
// return a random word from wordBank
function generateWord() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

// display the random word as underscores
function displayNewWord() {

    // capture the random word in a variable
    currentWord = generateWord();

    // // console insight
    // console.log(`\n\t${currentWord}`);

    // for every letter in the word, display it as an underscore
    wordDisplay = [];
    for (var i = 0; i < currentWord.length; i++) {
        wordDisplay.push('_');
    }
    console.log(`\n\t${wordDisplay.join(' ')}\n`);

}

// ------------------------------------------------------------------------------------

// check if/where letter belongs in word
function checkIndex(letter) {
    return currentWord.includes(letter);
}

// check if letter has already been guessed
function checkRepeat(letter) {
    return currentGuesses.join('').includes(letter.toLowerCase());
}

function checkGuesses(num) {
    return num > 1;
}

function checkWin(word) {
    return word === currentWord;
}

// do all the letter checks
function handleLetter(letter) {

    // check if user has any guesses left
    var hasGuessesLeft = checkGuesses(guessesLeft);

    // check if letter has been guessed already
    var hasBeenGuessed = checkRepeat(letter);

    // check if letter belongs in the word
    var isInWord = checkIndex(letter);

    // log the letter to currentGuesses
    currentGuesses.push(letter);

    // if user still has guesses remaining
    if (hasGuessesLeft) {

        // if letter has already been guessed
        if (hasBeenGuessed) {

            console.log(chalk.blue.bold(`\n\tYou already guessed ${letter}!`));
            displayCurrentWord();
            askForGuess();

        }

        // if letter has not been guessed yet
        else {

            // if the letter belongs in the word
            if (isInWord) {

                // update the underscores with the letter at all indices
                updateWord(letter);

                // then...

                // if this guess completes the word
                if (wordDisplay.join('') === currentWord) {

                    // user wins
                    handleWin();
                }
                else {
                    console.log(chalk.green('\n\tCORRECT!!!'));
                    displayCurrentWord();
                    askForGuess();
                }
            }
            // if the letter does not belong in the word
            else {
                guessesLeft--;
                console.log(chalk.red(`\n\tINCORRECT!!!\n\t${guessesLeft === 1 ? '1 more guess left' : guessesLeft + ' guesses remaining'}!!!`));
                displayCurrentWord();
                askForGuess();
            }
        }
    }
    // if user runs out of guesses
    else {
        // user loses
        handleLoss();
    }
}

// ------------------------------------------------------------------------------------

// replace all of the appropriate underscores with the user's guess
function updateWord(letter) {

    // find all indices of letter
    var indices = [];
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter.toLowerCase()) {
            indices.push(i);
        }
    }

    // update the appropriate wordDisplay
    for (var i = 0; i < wordDisplay.length; i++) {
        wordDisplay[indices[i]] = letter.toLowerCase();
    }

}

// display the current underscores/letters
function displayCurrentWord() {
    console.log(`\n\t${wordDisplay.join(' ')}\n`);
}

// ------------------------------------------------------------------------------------

function handleWin() {
    console.log(chalk.blue.bold(`\n\tCongrats, you won!!! The word was '${currentWord}'.\n`));
    promptRestart();
}

function handleLoss() {
    console.log(chalk.blue.bold(`\n\tOh no! The word was '${currentWord}' ):\n`));
    promptRestart();
}

// ------------------------------------------------------------------------------------

// game start
function initGame() {

    // ask user if they want to play
    inquirer.prompt(
        {
            name: 'startGame',
            type: 'confirm',
            message: 'Welcome to Constructor Hangman! Press enter to start playing.'
        }
    ).then((answer) => {
        // if they want to play, generate/display new word & ask them to guess letter
        if (answer.startGame === true) {
            displayNewWord();
            askForGuess();
            // if they don't, display exit message
        } else {
            console.log(chalk.cyan.bold('\n\tSayonara~\n'));
            return;
        }
    });

}

// ask if user wants to play again on win/lose
function promptRestart() {

    // reset stats
    guessesLeft = 10;
    currentGuesses = [];

    // ask user if they would like to play again (inquirer confirm)
    inquirer.prompt({
        name: 'playAgain',
        type: 'confirm',
        message: 'Play again?'
    }).then((answer) => {
        if (answer.playAgain === true) {
            displayNewWord();
            askForGuess();
        } else {
            console.log(chalk.cyan.bold('\n\tSayonara~\n'));
        }
    });
}

// prompt user to guess letter
function askForGuess() {
    inquirer.prompt(
        {
            name: 'guess',
            type: 'input',
            message: 'Guess a letter!',
            // check if letter is a letter
            validate: (value) => {
                var alphabet = 'abcdefghijklmnopqrstuvwxyz';
                if (alphabet.includes(value.toLowerCase())) {
                    return true;
                } else {
                    console.log(chalk.red(' => Please enter a letter'));
                    return false;
                }
            }
        }
    ).then((answer) => {
        handleLetter(answer.guess);
    });
}


// MAIN PROCESS
// ====================================================================================
initGame();