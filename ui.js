// js/ui.js

import { game, makeMove, resetGame, checkStatus } from './game.js';

// --- DOM Elements ---
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

// --- Helper Functions ---
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
    // Get the index from the HTML element's data attribute
    const index = parseInt(cell.dataset.index);

    // 1. Call the core game logic
    const marker = makeMove(index);

    if (marker) {
        // 2. Update the View (DOM)
        cell.textContent = marker;
        
        // 3. Update the status message
        updateStatusDisplay();
        
        // Optional: Add a class for styling (e.g., cell.classList.add(`player-${marker}`))
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
    // Note: Assuming index.html uses data-index="0" through "8"
    document.querySelectorAll('.square').forEach((cell, index) => {
        cell.dataset.index = index; // Ensure data-index is set if not in HTML
        cell.addEventListener('click', handleCellClick);
    });
    
    // Attach listener to reset button
    resetButton.addEventListener('click', handleResetClick);
    
    // Initial display
    updateStatusDisplay();
}

// Run setup when the script loads
initializeBoard();