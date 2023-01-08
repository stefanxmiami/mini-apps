import React, {useState} from 'react';
import Game from './Game';
import Options from './Options'
import '../style/style.css'

const BOARD_SIZES = [
    {
        rows: 9,
        cols: 9,
        mines: 10,
    },
    {
        rows: 16,
        cols: 16,
        mines: 40,
    },
    {
        rows: 30,
        cols: 30,
        mines: 200,
    },
];

const MainMenu = () => {
    const [showGame, setShowGame] = useState(false);
    const [boardSize, setBoardSize] = useState(BOARD_SIZES[0]);
    const [boardSizeIndex, setBoardSizeIndex] = useState(0);

    const startNewGame = () => {
        setShowGame(true);
    };

    const reset = () => {
        setShowGame(false);
        setBoardSizeIndex(0);
        setBoardSize(BOARD_SIZES[0]);
    }

    const onBoardSizeChange = (e) => {
        const index = e.target.value;
        setBoardSize(BOARD_SIZES[index]);
        setBoardSizeIndex(index);
    };

    return (
        <div className="main-menu">
            {!showGame && (
                <div className="contents">
                    <button onClick={() => startNewGame()}>New game</button>
                    <Options onChange={onBoardSizeChange} value={boardSizeIndex} />
                </div>
            )}
            {showGame && (
                <Game rows={boardSize.rows} cols={boardSize.cols} mines={boardSize.mines} />
            )}
        </div>
    );
};

export default MainMenu;