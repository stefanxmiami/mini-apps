import React from 'react';

function Square({ value, onSquareClick, className }) {
    return (
        <button className={`square ${className}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;
