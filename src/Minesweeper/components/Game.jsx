import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import FlagCounter from './FlagCounter';
import Board from './Board';
import Modal from './Modal';
import '../style/style.css';
import {CELL_STATES} from './CELL_STATES';

const GameStates = {
    IN_PROGRESS: 'in_progress',
    WON: 'won',
    LOST: 'lost',
};

const Game = ({rows, cols, mines, onNewGame}) => {
    const [gameState, setGameState] = useState(GameStates.IN_PROGRESS);
    const [flagsRemaining, setFlagsRemaining] = useState(mines);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const createBoard = (rows, cols, mines) => {
        // Create the board as a 2D array of cells
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push({state: CELL_STATES.COVERED});
            }
            board.push(row);
        }

        // Place the mines randomly on the board
        for (let i = 0; i < mines; i++) {
            // Choose a random cell to place the mine
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);

            // Make sure the cell doesn't already have a mine
            if (board[row][col].hasMine) {
                i--;
                continue;
            }

            board[row][col].hasMine = true;
        }
        // Calculate the number of mines in each cell's neighbors
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let numNeighboringMines = 0;
                for (let ii = -1; ii <= 1; ii++) {
                    for (let jj = -1; jj <= 1; jj++) {
                        if (ii === 0 && jj === 0) {
                            continue;
                        }
                        const rowToCheck = i + ii;
                        const colToCheck = j + jj;
                        if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                            if (board[rowToCheck][colToCheck].hasMine) {
                                numNeighboringMines++;
                            }
                        }
                    }
                }
                board[i][j].numNeighboringMines = numNeighboringMines;
                board[i][j].numFlaggedNeighbors = 0;
            }
        }

        return board;
    };

    const handleCellClick = (row, col) => {
        console.log(`Clicked on cell: ${row},${col}`);
        if (board[row][col].hasMine) {
            setGameState(GameStates.LOST);
        } else {
            // Check if this cell has all of its neighboring bombs flagged
            let allNeighboringBombsFlagged = true;
            for (let ii = -1; ii <= 1; ii++) {
                for (let jj = -1; jj <= 1; jj++) {
                    if (ii === 0 && jj === 0) {
                        continue;
                    }
                    const rowToCheck = row + ii;
                    const colToCheck = col + jj;
                    if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                        if (board[rowToCheck][colToCheck].hasMine && board[rowToCheck][colToCheck].state !== CELL_STATES.FLAGGED) {
                            allNeighboringBombsFlagged = false;
                            break;
                        }
                    }
                }
                if (!allNeighboringBombsFlagged) {
                    break;
                }
            }
            if (allNeighboringBombsFlagged) {
                // Reveal this cell and all of its neighboring cells
                board[row][col].state = CELL_STATES.REVEALED;
                for (let ii = -1; ii <= 1; ii++) {
                    for (let jj = -1; jj <= 1; jj++) {
                        if (ii === 0 && jj === 0) {
                            continue;
                        }
                        const rowToCheck = row + ii;
                        const colToCheck = col + jj;
                        if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                            if (board[rowToCheck][colToCheck].state !== CELL_STATES.FLAGGED) {
                                board[rowToCheck][colToCheck].state = CELL_STATES.REVEALED;
                            }
                        }
                    }
                }
            } else {
                board[row][col].state = CELL_STATES.REVEALED;
            }
            setBoard([...board]);
        }
    };

    const expandEmptyCells = (board, row, col) => {
        // Base case: if the cell is out of bounds or has already been revealed, return
        if (
            row < 0 ||
            row >= board.length ||
            col < 0 ||
            col >= board[0].length ||
            board[row][col].state === CELL_STATES.REVEALED
        ) {
            return;
        }

        // Reveal the cell
        board[row][col].state = CELL_STATES.REVEALED;

        // If the cell doesn't have any neighboring mines, expand to its neighbors
        if (board[row][col].numNeighboringMines === 0) {
            for (let ii = -1; ii <= 1; ii++) {
                for (let jj = -1; jj <= 1; jj++) {
                    if (ii === 0 && jj === 0) {
                        continue;
                    }
                    const rowToCheck = row + ii;
                    const colToCheck = col + jj;
                    expandEmptyCells(board, rowToCheck, colToCheck);
                }
            }
        }
    };

    const handleCellRightClick = (row, col) => {
        console.log(`Right clicked on cell: ${row},${col}`);
        if (board[row][col].state === CELL_STATES.FLAGGED) {
            board[row][col].state = CELL_STATES.COVERED;
            for (let ii = -1; ii <= 1; ii++) {
                for (let jj = -1; jj <= 1; jj++) {
                    if (ii === 0 && jj === 0) {
                        continue;
                    }
                    const rowToCheck = row + ii;
                    const colToCheck = col + jj;
                    if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                        board[rowToCheck][colToCheck].numFlaggedNeighbors--;
                    }
                }
            }
        } else {
            board[row][col].state = CELL_STATES.FLAGGED;
            setFlagsRemaining(flagsRemaining - 1);
            for (let ii = -1; ii <= 1; ii++) {
                for (let jj = -1; jj <= 1; jj++) {
                    if (ii === 0 && jj === 0) {
                        continue;
                    }
                    const rowToCheck = row + ii;
                    const colToCheck = col + jj;
                    if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                        board[rowToCheck][colToCheck].numFlaggedNeighbors++;
                    }
                }
            }
        }
        setBoard([...board]);
    };

    const [board, setBoard] = useState(createBoard(rows, cols, mines));

    return (
        <div className="game">
            {gameState === GameStates.WON && (
                <Modal>
                    <h1>You won!</h1>
                    <button onClick={onNewGame}>New game</button>
                </Modal>
            )}
            {gameState === GameStates.LOST && (
                <Modal>
                    <h1>You lost :(</h1>
                    <button onClick={onNewGame}>New game</button>
                </Modal>
            )}
            <Timer timeElapsed={timeElapsed}/>
            <FlagCounter flagsRemaining={flagsRemaining}/>
            <Board
                rows={rows}
                cols={cols}
                board={board}
                onCellClick={handleCellClick}
                onCellRightClick={handleCellRightClick}
            />
        </div>
    );
}

export default Game;