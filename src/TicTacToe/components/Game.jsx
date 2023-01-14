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
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [ties, setTies] = useState(0);

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

    let winner = calculateWinner(currentSquares);
    let result;

    function play(choice) {
        if (winner.valueOf() == 'X') {
            console.log("x wins")
        }
        if (winner) {
            result = winner;
            console.log("winner: " + result.valueOf())
            if (result.valueOf() == 'X') {
                setXWins(xWins + 1);
                console.log("X winner: " + result.valueOf())
            }
            if (result.valueOf() == 'O') {
                setOWins(oWins + 1);

            }
        } else if (currentSquares.includes(null)) {
            result = null;
        } else {
            result = 'T';
            setTies(ties + 1);
            console.log("tie!");
        }
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
            <div className="scoreboard">
                <div className="x-wins">X: {xWins}</div>
                <div className="o-wins">O: {oWins}</div>
                <div className="ties">Ties: {ties}</div>
            </div>
        </>
    );
}

export default Game;