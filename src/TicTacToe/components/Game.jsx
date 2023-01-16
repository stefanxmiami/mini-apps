import React, {useState, useEffect} from 'react';
import Board from './Board';
import GameResult from './GameResult';
import Navbar from '../../Navbar/Navbar';
import Menu from '../../Navbar/Menu';
import calculateWinner from '../helpers/calculateWinner'
import Scoreboard from './Scoreboard';

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
        checkWinner();
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

    useEffect(() => {
        checkWinner();
    }, [currentSquares]);

    function checkWinner() {
        if (winner) {
            if (winner.valueOf() == 'X') {
                setXWins(xWins + 1);
                console.log("x wins")
            }
            if (winner.valueOf() == 'O') {
                setOWins(oWins + 1);
                console.log("o wins")
            }
        } else if (!currentSquares.includes(null)) {
            setTies(ties + 1);
            console.log("tie?")
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
            <div className="ttt-wrapper">
            <Scoreboard xWins={xWins} oWins={oWins} ties={ties} />
            <div className="tic-tac-toe-game-full">
                <div className="tic-tac-toe-game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                    <GameResult winner={winner} onReset={handleReset} xWins={xWins} oWins={oWins} ties={ties} />
                </div>
                <div className="tic-tac-toe-game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
            </div>
        </>
    );
}

export default Game;