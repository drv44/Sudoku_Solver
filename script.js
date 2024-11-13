// Create the Sudoku board (9x9 grid of input fields)
function createBoard() {
    const board = document.getElementById('sudoku-board');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0');
            input.setAttribute('max', '9');
            input.setAttribute('value', '0');  // Set default value as 0
            input.id = `cell-${i}-${j}`;

            // Add event listener for arrow key navigation
            input.addEventListener('keydown', (event) => handleArrowNavigation(event, i, j));

            board.appendChild(input);
        }
    }
}

// Handle arrow key navigation in the Sudoku board
function handleArrowNavigation(event, row, col) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            if (row > 0) document.getElementById(`cell-${row-1}-${col}`).focus();
            break;
        case 'ArrowDown':
            if (row < 8) document.getElementById(`cell-${row+1}-${col}`).focus();
            break;
        case 'ArrowLeft':
            if (col > 0) document.getElementById(`cell-${row}-${col-1}`).focus();
            break;
        case 'ArrowRight':
            if (col < 8) document.getElementById(`cell-${row}-${col+1}`).focus();
            break;
    }
}

// Check if it's safe to place num in the given row and column
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] == num || board[x][col] == num) return false;
    }

    const startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) return false;
        }
    }

    return true;
}

// Solve Sudoku using backtracking
function solveSudokuHelper(board, row, col) {
    if (row == 9) return true;
    if (col == 9) return solveSudokuHelper(board, row + 1, 0);
    if (board[row][col] != 0) return solveSudokuHelper(board, row, col + 1);

    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuHelper(board, row, col + 1)) return true;
            board[row][col] = 0;
        }
    }

    return false;
}

// Get the user's input from the grid
function getBoardFromInput() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = document.getElementById(`cell-${i}-${j}`).value;
            row.push(value ? parseInt(value) : 0);
        }
        board.push(row);
    }
    return board;
}

// Fill the grid with the solution
function fillBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = board[i][j] ? board[i][j] : '';
        }
    }
}

// Main function to solve the Sudoku
function solveSudoku() {
    const board = getBoardFromInput();
    if (solveSudokuHelper(board, 0, 0)) {
        fillBoard(board);
    } else {
        alert('No solution exists!');
    }
}

// Reset the board
function resetBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = '0';
        }
    }
}

// Initialize the board on page load
window.onload = createBoard;
