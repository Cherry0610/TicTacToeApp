// js/ui.js

import { game, makeMove, resetGame, checkStatus } from './game.js';

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

function updateStatusDisplay() {
    if (game.gameActive) {
        statusElement.textContent = `It's ${game.currentPlayer}'s turn!`;
    } else if (game.winner) {
        statusElement.textContent = `🎉 Player ${game.winner} wins!`;
    } else {
        statusElement.textContent = `🤝 It's a Tie!`;
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);
    const marker = makeMove(index);

    if (marker) {
        // 2. Update the View (DOM)
        cell.textContent = marker;
        // 3. Update the status message
        updateStatusDisplay();
    }
}

function handleResetClick() {
    resetGame();
    
    // 1. Clear the board visuals
    document.querySelectorAll('.square').forEach(cell => {
        cell.textContent = '';
    });
    
    // 2. Reset status display
    updateStatusDisplay();
}

// --- Initialization ---

// Attach event listeners to all squares
function initializeBoard() {
    document.querySelectorAll('.square').forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', handleResetClick);
    
    updateStatusDisplay();
}

initializeBoard();
