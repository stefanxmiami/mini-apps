import React, { useState } from 'react';
import Game from './components/Game';
import MainMenu from './components/MainMenu'
import './style/style.css'

const Minesweeper = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [rows, setRows] = useState(9);
    const [cols, setCols] = useState(9);
    const [mines, setMines] = useState(10);

    const startNewGame = () => {
        setIsPlaying(true);
    };

    return (
        <div className="minesweeper">
            {isPlaying ? (
                <Game rows={rows} cols={cols} mines={mines} onNewGame={startNewGame} />
            ) : (
                <MainMenu onNewGame={startNewGame} />
            )}
        </div>
    );
};

export default Minesweeper;