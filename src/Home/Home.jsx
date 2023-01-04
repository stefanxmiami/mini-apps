import React from 'react';
import {Link} from 'react-router-dom';
import calculatorImg from './img/calculator.png';
import clockImg from './img/clock.png';
import minesweeperImg from './img/minesweeper.png';
import rockpaperscissorsImg from './img/rockpaperscissors.png';
import tictactoeImg from './img/tictactoe.png';
import todolistImg from './img/todolist.png';
import './style/style.css'

const Home = () => {
  return (
    <div className="cards">
      <div className="card-column">
        <div className="card">
          <img src={calculatorImg} alt="Calculator" />
          <h3>Calculator</h3>
          <p>Perform basic math operations with this simple calculator.</p>
          <Link to="/calculator">View App</Link>
        </div>
        <div className="card">
          <img src={clockImg} alt="Clock" />
          <h3>Clock</h3>
          <p>See the current time and date with this digital clock.</p>
          <Link to="/clock">View App</Link>
        </div>
        <div className="card">
          <img src={minesweeperImg} alt="Minesweeper" />
          <h3>Minesweeper</h3>
          <p>Test your problem-solving skills with this classic game.</p>
          <Link to="/minesweeper">View App</Link>
        </div>
      </div>
      <div className="card-column">
        <div className="card">
          <img src={rockpaperscissorsImg} alt="Rock Paper Scissors" />
          <h3>Rock Paper Scissors</h3>
          <p>Play a game of Rock Paper Scissors against the computer.</p>
          <Link to="/rock-paper-scissors">View App</Link>
        </div>
        <div className="card">
          <img src={tictactoeImg} alt="Tic Tac Toe" />
          <h3>Tic Tac Toe</h3>
          <p>Play a game of Tic Tac Toe against the computer.</p>
          <Link to="/tic-tac-toe">View App</Link>
        </div>
        <div className="card">
          <img src={todolistImg} alt="To-Do List" />
          <h3>To-Do List</h3>
          <p>Keep track of your tasks with this interactive to-do list.</p>
          <Link to="/todo-list">View App</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;