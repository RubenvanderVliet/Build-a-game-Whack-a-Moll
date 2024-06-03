// Game variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let playerStakes = { 'X': 'Player X', 'O': 'Player O' };
let playerScoreX = 0;
let playerScoreO = 0;

// DOM elements
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const vsComputerButton = document.querySelector('.vs-computer');
const inputBoxOne = document.querySelector('.input-one');
const inputBoxTwo = document.querySelector('.input-two');
const inputNameOne = document.querySelector('.name-x');
const inputNameTwo = document.querySelector('.name-o');
const scoreDisplayX = document.querySelector('.score-x');
const scoreDisplayO = document.querySelector('.score-o');

// list of icons and swearwords that cant be used 
const iconList = {
    icon1: '!',
    icon2: '@',
    icon3: '#',
    icon4: '$',
    icon5: '%',
    icon6: '^',
    icon7: '&',
    icon8: '*',
    icon9: '(',
    icon10: ')'
}
const swearWordsList = {
    word1: 'kloot',
    word2: 'sukkel',
    word3: 'lompo',
    word4: 'lijer',
    word5: 'stom',
}


// Event listener for input changes
inputBoxOne.addEventListener('input', () => handleInputValidation());
inputBoxTwo.addEventListener('input', () => handleInputValidation());

// Function to handle input validation and button state
function handleInputValidation() {
    const errorOne = validateInput(inputBoxOne.value, iconList, swearWordsList);
    const errorTwo = validateInput(inputBoxTwo.value, iconList, swearWordsList);

    if (errorOne) {
        alert(`Player 1: ${errorOne}`);
        resetButton.disabled = true;
        vsComputerButton.disabled = true;
    } else if (errorTwo) {
        alert(`Player 2: ${errorTwo}`);
        resetButton.disabled = true;
        vsComputerButton.disabled = true;
    }
}

// Function to validate input against iconList and swearWordsList
function validateInput(inputValue, iconList, swearWordsList) {
    // Check if the input contains any icons
    const invalidIcon = Object.keys(iconList).find(icon => inputValue.includes(iconList[icon]));
    // Check if the input contains any swear words
    const invalidSwearWord = Object.keys(swearWordsList).find(word => inputValue.includes(swearWordsList[word]));
    
    // If an icon is found, display an alert with the details
    if (invalidIcon) {
        alert(`Invalid icon found: ${iconList[invalidIcon]}`);
    }
    // If an swear word is found, display an alert with the details
    if (invalidSwearWord) {
        alert(`Invalid swear word found: ${swearWordsList[invalidSwearWord]}`);
    }
}

// Inactive buttons initially
resetButton.disabled = true;
vsComputerButton.disabled = true;

// function to add point to score of the winner
function winnnerPoints () {
    if (gameOver) {
        // add points to the winner's score
        if (currentPlayer === 'X') {
            playerScoreX++;
            scoreDisplayX.textContent = `${playerStakes['X']} Score: ${playerScoreX}`;
        } else if (currentPlayer === 'O') {
            playerScoreO++;
            scoreDisplayO.textContent = `${playerStakes['O']} Score: ${playerScoreO}`;
        }
    }
 }

// Function to check for a winner
function declareWinner() {
    const winningVariations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningVariations) {
        const [a, b, c] = combo;
        // Check if the symbols in the selected cells of the winning combination are the same
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            status.textContent = `Congratulations! ${playerStakes[currentPlayer]} has won the game!`;
            winnnerPoints();
            return true;
        }
    }
    
    // Check if all cells are filled
    if (board.every(cell => cell !== '')) {
        gameOver = true;
        status.textContent = 'It\'s a draw!';
        return true;
    }

    // Return false if there has been no winner or loser
    return false;
}

// Function to handle player moves
function makeMove(index) {
    // Check if player names are entered
    if (inputBoxOne.value === '' || inputBoxTwo.value === '') {
        alert('Please enter names for both players before starting the game');
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        return;
    } else {
        inputNameOne.textContent = inputBoxOne.value + ' X';
        inputNameTwo.textContent = inputBoxTwo.value + ' O';
        resetButton.disabled = false;
        vsComputerButton.disabled = false;
    }

    // Process the move if the game is not over and the cell is empty
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        // Check for a winner after the move
        if (declareWinner()) {
            return;
        }

        // Switch to the other player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${playerStakes[currentPlayer]} it's your turn`;

        // If vs Computer mode is active and it's the computer's turn, make the computer move
        if (vsComputerButton.classList.contains('active') && currentPlayer === 'O') {
            computerMove();
        }
    }
}

// Function for the computer to make a move
function computerMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        // If the cell is empty, add its index to the acc
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    // Make a random move if there are empty cells available
    if (emptyCells.length > 0) {
        // Generate a random index within available empty cells
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        makeMove(emptyCells[randomIndex]);
    }
}

// Function to reset the game
function resetGame() {
    // Reset game variables and update UI
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    status.textContent = `${playerStakes[currentPlayer]} it's your turn`;
    playerStakes = { 'X': 'Player X', 'O': 'Player O' };
    inputNameOne.textContent = 'Player X';
    inputNameTwo.textContent = 'Player O';
}

// Function to toggle vs Computer mode
function toggleVsComputer() {
    // Toggle the 'active' class on the vsComputerButton,
    vsComputerButton.classList.toggle('active');
    resetGame();
    playerStakes = { 'X': 'Player X', 'O': 'Computer' };
}

// Event listeners for player moves, game reset, and vs Computer toggle
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

resetButton.addEventListener('click', resetGame);
vsComputerButton.addEventListener('click', toggleVsComputer);