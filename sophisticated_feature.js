// filename: sophisticated_feature.js

// This code demonstrates a sophisticated feature: implementing a Tic-Tac-Toe game with an AI opponent

// Represents the Tic Tac Toe game board
const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// Represents the available winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Represents the players
const players = {
  human: 'X',
  ai: 'O'
};

// Represents the current player
let currentPlayer = players.human;

// Make a move on the game board
function makeMove(position, player) {
  if (board[position] === ' ') {
    board[position] = player;
    return true;
  }
  return false;
}

// Determines if a player has won the game
function checkWin(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

// Determine if the game is a tie
function checkTie() {
  return board.every((position) => position !== ' ');
}

// The main game loop
function gameLoop() {
  console.log('Tic Tac Toe - Starting game!');
  console.log('You are X, and the computer is O.');
  console.log('Enter a number (0-8) to make a move.');

  let gameOver = false;

  while (!gameOver) {
    if (currentPlayer === players.human) {
      const input = prompt('Your turn: ');

      if (input !== null) {
        const position = parseInt(input.trim(), 10);
        if (makeMove(position, currentPlayer)) {
          currentPlayer = players.ai;
        } else {
          console.log('Invalid move, please try again.');
        }
      }
    } else {
      // AI turn
      const aiMove = calculateAIMove();
      if (makeMove(aiMove, currentPlayer)) {
        currentPlayer = players.human;
      }
    }

    console.clear();
    displayBoard();

    if (checkWin(currentPlayer)) {
      console.log(`Player ${currentPlayer} wins!`);
      gameOver = true;
    } else if (checkTie()) {
      console.log('It\'s a tie!');
      gameOver = true;
    }
  }

  console.log('Game Over!');
  console.log('Thanks for playing.');
}

// Calculates the AI's next move
function calculateAIMove() {
  const availablePositions = board.reduce((acc, val, index) => {
    if (val === ' ') {
      acc.push(index);
    }
    return acc;
  }, []);

  // Randomly select a position from the available ones
  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomIndex];
}

// Displays the Tic Tac Toe game board
function displayBoard() {
  console.log('');
  console.log(` ${board[0]} | ${board[1]} | ${board[2]} `);
  console.log('---+---+---');
  console.log(` ${board[3]} | ${board[4]} | ${board[5]} `);
  console.log('---+---+---');
  console.log(` ${board[6]} | ${board[7]} | ${board[8]} `);
  console.log('');
}

// Start the game
gameLoop();