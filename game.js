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
function generateWord() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

function displayNewWord() {
    currentWord = generateWord();
    // console.log(`\n\t${currentWord}`);
    wordDisplay = [];
    for (var i = 0; i < currentWord.length; i++) {
        wordDisplay.push('_');
    }
    console.log(`\n\t${wordDisplay.join(' ')}\n`);
}

function initGame() {
    // prompt user if they want to play
    inquirer.prompt(
        {
            name: 'startGame',
            type: 'confirm',
            message: 'Welcome to Constructor Hangman! Press enter to start playing.'
        }
    ).then((answer) => {
        if (answer.startGame === true) {
            displayNewWord();
            askForGuess();
        } else {
            console.log(chalk.cyan.bold('\n\tSayonara~\n'));
            return;
        }
    });
}

function askForGuess() {
    // prompt user to guess letter
    inquirer.prompt(
        {
            name: 'guess',
            type: 'input',
            message: 'Guess a letter!',
            // check if letter is in alphabet
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

function handleLetter(letter) {
    // var isLetter = checkCharacter(letter);
    var isInWord = checkIndex(letter);
    var hasBeenGuessed = checkRepeat(letter);
    var hasGuessesLeft = checkGuesses(guessesLeft);

    currentGuesses.push(letter);

    // if user has guesses left
    if (hasGuessesLeft) {
        // if letter has already been guessed
        if (hasBeenGuessed) {
            console.log(chalk.blue.bold(`\n\tYou already guessed ${letter}!`));
            displayCurrentWord();
            askForGuess();
        }
        // if letter has not been guessed yet
        else {
            // if user's guess belongs in word
            if (isInWord) {
                
                updateWord(letter);

                // if user guesses word (wins)
                if (wordDisplay.join('') === currentWord) {
                    handleWin();
                }
                else {
                    console.log(chalk.green('\n\tCORRECT!!!'));
                    displayCurrentWord();
                    askForGuess();
                }
            }
            // if user's guess does not belong in word
            else {
                guessesLeft--;
                console.log(chalk.red(`\n\tINCORRECT!!!\n\t${guessesLeft === 1 ? '1 more guess left' : guessesLeft + ' guesses remaining'}!!!`));
                displayCurrentWord();
                askForGuess();
            }
        }
    }
    // if user runs out of guesses (loses)
    else {
        handleLoss();
    }
}

// // check if letter is in the alphabet
// function checkCharacter(letter) {
//     return letter.match(alphabet).length > 0;
// }

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

function displayCurrentWord() {
    console.log(`\n\t${wordDisplay.join(' ')}\n`);
}

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

function handleWin() {
    console.log(chalk.blue.bold(`\n\tCongrats, you won!!! The word was '${currentWord}'.\n`));
    promptRestart();
}

function handleLoss() {
    console.log(chalk.blue.bold(`\n\tOh no! The word was '${currentWord}' ):\n`));
    promptRestart();
}

function promptRestart() {
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


// MAIN PROCESS
// ====================================================================================
initGame();