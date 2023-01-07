import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import calculatorImg from './img/calculator.png';
import clockImg from './img/clock.png';
import minesweeperImg from './img/minesweeper.png';
import rockpaperscissorsImg from './img/rockpaperscissors.png';
import tictactoeImg from './img/tictactoe.png';
import todolistImg from './img/todolist.png';
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';
import './style/style.css'

const Home = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='home-background'>
            <Navbar appName="Home" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <div className="cards">
                <div className="card-column">
                    <Link className="card" to="/calculator">
                        <img src={calculatorImg} alt="Calculator"/>
                        <h3>Calculator</h3>
                        <p>Perform basic math operations with this simple calculator.</p>
                    </Link>
                    <Link className="card" to="/clock">
                        <img src={clockImg} alt="Clock"/>
                        <h3>Clock</h3>
                        <p>See the current time and date with this digital clock.</p>
                    </Link>
                    <Link className="card" to="/minesweeper">
                        <img src={minesweeperImg} alt="Minesweeper"/>
                        <h3>Minesweeper</h3>
                        <p>Test your problem-solving skills with this classic game.</p>
                    </Link>
                </div>
                <div className="card-column">
                    <Link className="card" to="/rock-paper-scissors">
                        <img src={rockpaperscissorsImg} alt="Rock Paper Scissors"/>
                        <h3>Rock Paper Scissors</h3>
                        <p>Play a game of Rock Paper Scissors against the computer.</p>
                    </Link>
                    <Link className="card" to="/tic-tac-toe">
                        <img src={tictactoeImg} alt="Tic Tac Toe"/>
                        <h3>Tic Tac Toe</h3>
                        <p>Play a game of Tic Tac Toe against the computer.</p>
                    </Link>
                    <Link className="card" to="/todo-list">
                        <img src={todolistImg} alt="To-Do List"/>
                        <h3>To-Do List</h3>
                        <p>Keep track of your tasks with this interactive to-do list.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;