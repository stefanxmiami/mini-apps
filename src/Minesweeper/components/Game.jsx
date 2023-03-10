import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import FlagCounter from './FlagCounter';
import Board from './Board';
import Modal from './Modal';
import LeaderboardModal from './LeaderboardModal';
import '../style/style.css';
import {CELL_STATES} from './CELL_STATES';
import Confetti from 'react-confetti';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

const GameStates = {
    IN_PROGRESS: 'in_progress',
    WON: 'won',
    LOST: 'lost',
};

const Game = ({rows, cols, mines, onNewGame, leaderboard}) => {
    const [gameState, setGameState] = useState(GameStates.IN_PROGRESS);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameFinishedTime, setGameFinishedTime] = useState(0);
    const [leaderboardModalIsOpen, setLeaderboardModalIsOpen] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(mines);
    const hasCoveredCells = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j].state === CELL_STATES.COVERED) {
                    return true;
                }
            }
        }
        return false;
    };

    useEffect(() => {
        let intervalId;
        if (gameState === GameStates.IN_PROGRESS) {
            intervalId = setInterval(() => {
                setTimeElapsed(timeElapsed => timeElapsed + 1);
                setGameFinishedTime(gameFinishedTime => gameFinishedTime + 1);
            }, 1000);
        } else if (intervalId) {
            // setGameFinishedTime(intervalId);
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [gameState, timeElapsed]);

    function calculateNumOfAdjacentMines(rows, cols, board) {
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
    }

    function placeMinesOnBoard(mines, rows, cols, board) {
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
    }

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
        placeMinesOnBoard(mines, rows, cols, board);
        // Calculate the number of mines in each cell's neighbors
        calculateNumOfAdjacentMines(rows, cols, board);

        const boardElement = document.querySelector('.board');
        if (boardElement) {
            if (board.length === 16) {
                boardElement.classList.add('board-16x16');
            } else if (board.length === 30) {
                boardElement.classList.add('board-30x16');
            }
        }

        return board;
    };

    const revealCell = (row, col) => {
        if (board[row][col].state !== CELL_STATES.COVERED) {
            return;
        }

        if (board[row][col].hasMine) {
            // setGameState(GameStates.LOST);
            return;
        }

        board[row][col].state = CELL_STATES.REVEALED;
        if (board[row][col].numNeighboringMines === 0) {
            for (let ii = -1; ii <= 1; ii++) {
                for (let jj = -1; jj <= 1; jj++) {
                    if (ii === 0 && jj === 0) {
                        continue;
                    }
                    const rowToCheck = row + ii;
                    const colToCheck = col + jj;
                    if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                        if (board[rowToCheck][colToCheck].state === CELL_STATES.COVERED && !board[rowToCheck][colToCheck].hasMine) {
                            revealCell(rowToCheck, colToCheck);
                        }
                    }
                }
            }
        }

        if (!hasCoveredCells()) {
            setLeaderboardModalIsOpen(true);
            setGameState(GameStates.WON);
        }
    };

    function countFlaggedNeighbors(board, row, col) {
        let flaggedCount = 0;
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0) {
                    continue;
                }
                const rowToCheck = row + ii;
                const colToCheck = col + jj;
                if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                    if (board[rowToCheck][colToCheck].state === CELL_STATES.FLAGGED) {
                        flaggedCount++;
                    }
                }
            }
        }
        return flaggedCount;
    }

    function areFlaggedCellsMines(board, row, col) {
        let flaggedCellsContainMines = true;
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0) {
                    continue;
                }
                const rowToCheck = row + ii;
                const colToCheck = col + jj;
                if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                    if (board[rowToCheck][colToCheck].state === CELL_STATES.FLAGGED && !board[rowToCheck][colToCheck].hasMine) {
                        flaggedCellsContainMines = false;
                        break;
                    }
                }
            }
        }
        return flaggedCellsContainMines;
    }

    function revealAllBombs() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j].hasMine) {
                    board[i][j].state = CELL_STATES.BOMB_REVEALED;
                    board[i][j].content = '????';
                }
            }
        }
        setGameState(GameStates.LOST);
    }

    const handleCellClick = (row, col) => {
        console.log(`Clicked on ${board[row][col].state} cell: ${row},${col}`);

        if (gameState === GameStates.WON || gameState === GameStates.LOST) {
            return;
        }

        if (timeElapsed === 0 && board[row][col].hasMine) {
            // remove the mine from the cell
            board[row][col].hasMine = false;
            // place the mine somewhere else
            let newRow, newCol;
            do {
                newRow = Math.floor(Math.random() * rows);
                newCol = Math.floor(Math.random() * cols);
            } while (board[newRow][newCol].hasMine);
            board[newRow][newCol].hasMine = true;
            // recalculate the number of adjacent mines for each cell
            calculateNumOfAdjacentMines(rows, cols, board);
        }

        if (board[row][col].state === CELL_STATES.FLAGGED) {
            return; // Disallow clicking on flagged cells
        }

        if (board[row][col].state === CELL_STATES.REVEALED && board[row][col].numNeighboringMines) {
            console.log(`Clicked on ${board[row][col].state} cell: ${row},${col} value = ${board[row][col].numNeighboringMines}`);
            console.log(`Clicked on ${board[row][col].state} cell: ${row},${col} flags = ${countFlaggedNeighbors(board, row, col)}`);
            if (board[row][col].numNeighboringMines !== board[row][col].numFlaggedNeighbors) {
                return; // Disallow clicking on numbered cells if there's an unequal number of flagged neighboring cells
            } else {
                if (areFlaggedCellsMines(board, row, col, countFlaggedNeighbors(board, row, col))) {
                    console.log(board[row][col].numNeighboringMines !== board[row][col].numFlaggedNeighbors);
                } else {
                    revealAllBombs();
                    setModalIsOpen(true);
                    setGameState(GameStates.LOST);
                }
            }
        }

        if (board[row][col].hasMine) {
            revealAllBombs();
            setModalIsOpen(true);
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
                if (allNeighboringBombsFlagged) {
                    revealCell(row, col);
                    revealEmptyCells(row, col);
                    if (!hasCoveredCells()) {
                        setLeaderboardModalIsOpen(true);
                        setGameState(GameStates.WON);
                    }
                } else {
                    // Otherwise, just reveal the clicked cell
                    board[row][col].state = CELL_STATES.REVEALED;
                    revealEmptyCells(board, row, col)
                }
            }
            setBoard([...board]);
        }

        if (!hasCoveredCells()) {
            setLeaderboardModalIsOpen(true);
            setGameState(GameStates.WON);
        }
    };

    const revealEmptyCells = (row, col) => {
        /*if (board[row][col].numNeighboringMines > 0 && !areNeighboringCellsFlagged(board, row, col)) {
            return;
        }*/
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0) {
                    continue;
                }
                const rowToCheck = row + ii;
                const colToCheck = col + jj;
                if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                    revealCell(rowToCheck, colToCheck);
                }
            }
        }
    };

    function areNeighboringCellsFlagged(board, row, col, requiredFlaggedCount) {
        let flaggedCount = 0;
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0) {
                    continue;
                }
                const rowToCheck = row + ii;
                const colToCheck = col + jj;
                if (rowToCheck >= 0 && rowToCheck < rows && colToCheck >= 0 && colToCheck < cols) {
                    if (board[rowToCheck][colToCheck].state === CELL_STATES.FLAGGED) {
                        flaggedCount++;
                    }
                }
            }
        }
    };

    const handleCellRightClick = (row, col) => {
        console.log(`Right clicked on cell: ${row},${col}`);

        if (gameState === GameStates.WON || gameState === GameStates.LOST) {
            return;
        }

        if (board[row][col].state === CELL_STATES.FLAGGED) {
            setFlagsRemaining(flagsRemaining + 1);
        }
        // Return early if the cell is revealed
        if (board[row][col].state === CELL_STATES.REVEALED) {
            return;
        }
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
        if (!hasCoveredCells()) {
            setLeaderboardModalIsOpen(true);
            setGameState(GameStates.WON);
        }
    };

    const [board, setBoard] = useState(createBoard(rows, cols, mines));

    const startNewGame = () => {
        setGameState(GameStates.IN_PROGRESS);
        setTimeElapsed(0);
        setGameFinishedTime(0);
        setFlagsRemaining(mines);
        setBoard(createBoard(rows, cols, mines));
    };

    function handleNewGameClick() {
        window.location.reload();
    }

    const handleCloseLeaderboardModal = () => {
        setLeaderboardModalIsOpen(false);
        // any other logic you want to handle here
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
        // any other logic you want to handle here
    }

    return (
        <div className="minesweeper-game">
            {gameState === GameStates.WON && <Confetti isRunning={true}/>}
            {gameState === GameStates.WON && (
                leaderboardModalIsOpen && (
                    <LeaderboardModal isOpen={leaderboardModalIsOpen} onClose={handleCloseLeaderboardModal}
                                      gameTime={gameFinishedTime} boardSize={board}/>
                )
            )}
            {gameState === GameStates.LOST && (
                modalIsOpen && (
                    <Modal isOpen={modalIsOpen} startNewGame={startNewGame} onClose={handleCloseModal}/>
                )
            )}
            <div className="game-stats">
                <Timer timeElapsed={timeElapsed}/>
                <FlagCounter flagsRemaining={flagsRemaining}/>
            </div>
            <Board
                rows={rows}
                cols={cols}
                board={board}
                onCellClick={handleCellClick}
                onCellRightClick={handleCellRightClick}
            />
            {gameState === GameStates.WON && (
                <div className="new-game-buttons">
                    <button onClick={startNewGame}>Try again</button>
                    <button className="new-game-btn" onClick={handleNewGameClick}>Main Menu</button>
                </div>
            )}
            {gameState === GameStates.LOST && (
                <div className="new-game-buttons">
                    <button onClick={startNewGame}>Try again</button>
                    <button className="new-game-btn" onClick={handleNewGameClick}>Main Menu</button>
                </div>
            )}
        </div>
    );
}

export default Game;
