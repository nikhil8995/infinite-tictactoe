let gameId = null;
let currentFadingPosition = null;

// Initialize game
async function initGame() {
    try {
        const response = await fetch('/api/new_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        gameId = data.game_id;
        updateBoard(data.board);
        updateCurrentPlayer(data.current_player);
        document.getElementById('winner-display').style.display = 'none';
        currentFadingPosition = null;
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

// Update board display
function updateBoard(board) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const value = board[index];
        cell.textContent = value;
        
        // Remove all classes first
        cell.classList.remove('occupied', 'fading', 'X', 'O');
        
        // Add appropriate classes
        if (value !== '') {
            cell.classList.add('occupied', value);
        }
        
        // Add fading class if this is the fading position
        if (index === currentFadingPosition && value !== '') {
            cell.classList.add('fading');
        }
    });
}

// Update current player display
function updateCurrentPlayer(player) {
    document.getElementById('current-player').textContent = `Current Player: ${player}`;
}

// Handle cell click
async function handleCellClick(event) {
    const cell = event.target;
    const position = parseInt(cell.dataset.index);
    
    // Check if cell is occupied or fading
    if (cell.classList.contains('occupied')) {
        return;
    }
    
    // Check if this is the fading position
    if (position === currentFadingPosition) {
        // Show feedback that this cell cannot be clicked
        cell.style.background = '#ffcccc';
        setTimeout(() => {
            cell.style.background = '';
        }, 300);
        return;
    }
    
    try {
        const response = await fetch('/api/make_move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_id: gameId,
                position: position
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Move error:', error);
            return;
        }
        
        const data = await response.json();
        
        // Update fading position
        currentFadingPosition = data.fading_position;
        
        // Update board
        updateBoard(data.board);
        updateCurrentPlayer(data.current_player);
        
        // Check for winner
        if (data.winner) {
            displayWinner(data.winner);
        }
    } catch (error) {
        console.error('Error making move:', error);
    }
}

// Display winner
function displayWinner(winner) {
    const winnerDisplay = document.getElementById('winner-display');
    winnerDisplay.textContent = `🎉 Player ${winner} Wins! 🎉`;
    winnerDisplay.style.display = 'block';
    
    // Disable all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
    
    // Re-enable after showing message
    setTimeout(() => {
        cells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
        });
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize game on load
    initGame();
    
    // Add click listeners to cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // New game button
    document.getElementById('new-game-btn').addEventListener('click', () => {
        initGame();
    });
});
