import React, { useState } from 'react';

function Scoreboard({ xWins, oWins, ties }) {
    return (
        <div className="ttt-scoreboard">
            <div className="x-wins">Tic: {xWins}</div>
            <div className="o-wins">Tac: {oWins}</div>
            <div className="ttt-ties">Toe: {ties}</div>
        </div>
    );
}

export default Scoreboard;