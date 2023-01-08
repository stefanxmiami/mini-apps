import React, {useState} from 'react';
import Game from './components/Game';
import MainMenu from './components/MainMenu'
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';
import './style/style.css'

const Minesweeper = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [rows, setRows] = useState(9);
    const [cols, setCols] = useState(9);
    const [mines, setMines] = useState(10);

    const startNewGame = () => {
        setIsPlaying(true);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="minesweeper-full">
            <Navbar appName="MinesweepR" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <div className="minesweeper">
                {isPlaying ? (
                    <Game rows={rows} cols={cols} mines={mines} onNewGame={startNewGame}/>
                ) : (
                    <MainMenu onNewGame={startNewGame}/>
                )}
            </div>
        </div>
    );
};

export default Minesweeper;