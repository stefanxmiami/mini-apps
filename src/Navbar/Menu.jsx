import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'

const Menu = () => {
    return (
        <nav className='menu-items'>
            <div className="dropdown-menu">
                <Link className='menu-item' to="/calculator">Calculator</Link>
                <Link className='menu-item' to="/clock">Clock</Link>
                <Link className='menu-item' to="/minesweeper">Minesweeper</Link>
                <Link className='menu-item' to="/rock-paper-scissors">Rock Paper Scissor</Link>
                <Link className='menu-item' to="/tic-tac-toe">Tic Tac Toe</Link>
                <Link className='menu-item' to="/todo-list">To-Do List</Link>
            </div>
        </nav>
    );
};

export default Menu;