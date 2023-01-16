import React from 'react';
import '../style/style.css'

const CELL_STATES = {
    COVERED: 'covered',
    REVEALED: 'revealed',
    FLAGGED: 'flagged',
    BOMB_REVEALED: 'bomb-revealed',
};

const Cell = ({ row, col, state, onClick, onRightClick }) => {
    return (
        <div
            className={`cell ${state}`}
            onClick={() => onClick(row, col)}
            onContextMenu={(e) => {
                e.preventDefault();
                onRightClick(row, col);
            }}
        ></div>
    );
};

export default Cell;