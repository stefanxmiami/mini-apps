import React from 'react';

function GameResult({ winner, onReset }) {
    if (!winner) {
        return null;
    }

    return (
        <div className="tic-tac-toe-game-result">
            <button className="reset-button" onClick={onReset}>Reset</button>
        </div>
    );
}

export default GameResult;