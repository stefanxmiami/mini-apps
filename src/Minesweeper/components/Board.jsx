import React from 'react';
import Cell from './Cell';
import { CELL_STATES } from './CELL_STATES';
import '../style/style.css'

const Board = ({ board, onCellClick, onCellRightClick, rows, cols }) => {
    return (
        <div className="board">
            {board.map((row, i) =>
                row.map((cell, j) => (
                    <div
                        key={`${i}-${j}`}
                        className={`cell ${cell.state}`}
                        onClick={() => onCellClick(i, j)}
                        onContextMenu={(event) => {
                            event.preventDefault();
                            onCellRightClick(i, j);
                        }}
                    >
                        {cell.numNeighboringMines !== 0 && cell.state === CELL_STATES.REVEALED
                            ? cell.numNeighboringMines
                            : null}
                    </div>
                ))
            )}
        </div>
    );
};

export default Board;