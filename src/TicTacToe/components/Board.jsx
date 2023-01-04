import React from 'react';
import Square from './Square';
import calculateWinner from '../helpers/calculateWinner'
import '../style.css'

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    let result;
    if (winner) {
        result = winner;
        status = 'Winner: ' + result;
    } else if (squares.includes(null)) {
        result = null;
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } else {
        status = 'It\'s a tie!';
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} className={squares[0]} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} className={squares[1]} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} className={squares[2]} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} className={squares[3]} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} className={squares[4]} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} className={squares[5]} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} className={squares[6]} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} className={squares[7]} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} className={squares[8]} />
            </div>
        </>
    );
}

export default Board;
