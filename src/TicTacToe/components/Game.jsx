import React, {useState} from 'react';
import Board from './Board';
import GameResult from './GameResult';
import Navbar from '../../Navbar/Navbar';
import Menu from '../../Navbar/Menu';
import calculateWinner from '../helpers/calculateWinner'

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    const winner = calculateWinner(currentSquares);
    let result;
    if (winner) {
        result = winner;
    } else if (currentSquares.includes(null)) {
        result = null;
    } else {
        result = 'T';
    }

    function handleReset() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Navbar appName="Tic Tac Toe" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
        <div className="tic-tac-toe-game-full">
                <div className="tic-tac-toe-game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                    <GameResult winner={result} onReset={handleReset}/>
                </div>
            <div className="tic-tac-toe-game-info">
                <ol>{moves}</ol>
            </div>
        </div>
        </>
    );
}

export default Game;