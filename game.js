// GLOBAL VARIABLES
// ====================================================================================
// require modules
var inquirer = require('inquirer');
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
    console.log(`\n\t${currentWord}\n`);
    underscores = [];
    for (var i = 0; i < currentWord.length; i++) {
        underscores.push('_');
    }
    console.log(`\n\t${underscores.join(' ')}\n`);
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
    return currentGuesses.join('').includes(letter);
}

function checkGuesses(num) {
    return num > 0;
}

function updateWord() {
    inquirer.prompt(
        {
            name: 'guess',
            type: 'input',
            message: 'Guess a letter!',
            // check if letter is in alphabet
            validate: (value) => {
                if (typeof value === 'string') {
                    return true;
                } else {
                    return 'Please enter a letter';
                }
            }
        }
    ).then((answer) => {
        // var isLetter = checkCharacter(answer.guess);
        var isInWord = checkIndex(answer.guess);
        var hasBeenGuessed = checkRepeat(answer.guess);

        currentGuesses.push(answer.guess);

        // if letter has already been guessed
        if (hasBeenGuessed) {
            console.log(`\n\tYou already guessed ${answer.guess}!\n`);
            updateWord();
        }
        // if letter has not been guessed yet
        else {
            // if user's guess belongs in word
            if (isInWord) {

                console.log('\n\tCORRECT!!!\n');

                // find all indices of letter
                var indices = [];
                for (var i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] === answer.guess) {
                        indices.push(i);
                    }
                }

                // update the appropriate underscores
                for (var i = 0; i < underscores.length; i++) {
                    underscores[indices[i]] = answer.guess;
                }

                console.log(`\n\t${underscores.join(' ')}\n`);
                updateWord();
                checkWinOrLose();
            }
            // if user's guess does not belong in word
            else {
                console.warn('\n\tINCORRECT!!!\n');
                guessesLeft--;
                console.log(`\n\t${guessesLeft} guesses remaining!!!\n`);
                updateWord();
                checkWinOrLose();
            }
        }
    });
}

function checkWinOrLose() {
    // If guesses run out (user loses)
    if (guessesLeft === 0) {
        console.log(`\n\tOh no! The word was '${currentWord}' ):\n`);
        guessesLeft = 10;
        currentGuesses = [];
        // ask user if they would like to play again (inquirer confirm)
        inquirer.prompt({
            name: 'playAgain',
            type: 'confirm',
            message: 'Play again?'
        }).then((answer) => {
            if (answer.playAgain === true) {
                initGame();
            } else {
                console.log('\n\tSayonara~\n');
            }
        });
    }
    // If user still has guesses left and guesses entire word (user wins)
    else if (underscores.join('') === currentWord) {
        // display win message
        console.log(`\n\tCongrats, you won!!! The word was '${currentWord}'.\n`);
        inquirer.prompt({
            name: 'playAgain',
            type: 'confirm',
            message: 'Play again?'
        }).then((answer) => {
            if (answer.playAgain === true) {
                initGame();
            } else {
                console.log('\n\tSayonara~\n');
            }
        });
    }
}


// MAIN PROCESS
// ====================================================================================
initGame();