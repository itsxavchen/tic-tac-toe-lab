/**
 * - Display an empty tic-tac-toe board when the page is initially displayed.
 * - A player can click on the nine cells to make a move.
 * - Every click will alternate between marking an X and O.
 * - Display whose turn it is (X or O).
 * - The cell cannot be played again once occupied with an X or O.
 * - Provide win logic and display a winning message.
 * - Provide logic for a cat’s game (tie), also displaying a message.
 * - Provide a Reset Game button that will clear the contents of the board.
 */

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.



/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X'
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const boardEl = document.querySelector('.board')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render()
}

function updateBoard () {
    board.forEach((square, index) => {
        squareEls[index].textContent = square
    })
};

function updateMessage () {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn.`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!"; 
    } else {
         messageEl.textContent = `Congratulations, ${turn} wins!`
    }
}



function render () {
    updateBoard ()
    updateMessage ()
}

function placePiece (index) {
    board[index] = turn

}



function handleClick(event) {
    const squareIndex = event.target.id;

    if (board[squareIndex] !== '' || winner) {
        return;
    }

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function checkForWinner () {
    winningCombos.forEach((winningCombo) => {
        if (board[winningCombo[0]] !== '' && board[winningCombo[0]] === board[winningCombo[1]] && board[winningCombo[0]] === board[winningCombo[2]]) {
            winner = true;
        } 
    })
}

function checkForTie() {
    if (winner) {
        return
    }
    for (let i = 0; i < board.length; i ++) {
        if (board[i] === '') {
            tie = false;
        } else {
            tie = true;
        }
    }
}

function switchPlayerTurn() {
    if (winner) {
        return;
    };

    if (turn === 'X') {
        turn = 'O';
    } else if (turn === 'O') {
        turn = 'X';
        }
}



/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load',init)
boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)