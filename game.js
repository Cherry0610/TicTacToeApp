// js/game.js

// --- Game State ---
export const game = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameActive: true,
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ],
    winner: null
};

// --- Core Logic Functions ---

export function resetGame() {
    game.board = ['', '', '', '', '', '', '', '', ''];
    game.currentPlayer = 'X';
    game.gameActive = true;
    game.winner = null;
    return true; 
}

export function checkStatus() {
    for (let i = 0; i < game.winningCombinations.length; i++) {
        const [a, b, c] = game.winningCombinations[i];
        if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
            game.gameActive = false;
            game.winner = game.currentPlayer;
            return 'WIN';
        }
    }

    if (game.board.every(cell => cell !== '')) {
        // TIE FOUND
        game.gameActive = false;
        return 'TIE';
    }

    // GAME CONTINUES
    return 'RUNNING';
}

export function makeMove(index) {
    // 1. Validation
    if (!game.gameActive || game.board[index] !== '') {
        return false; 
    }

    // 2. Update Model
    game.board[index] = game.currentPlayer;

    // 3. Check and Update Status
    const status = checkStatus();
    
    // 4. Switch Player if still running
    if (status === 'RUNNING') {
        game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    // Return the marker to the UI for display
    return game.board[index];
}
