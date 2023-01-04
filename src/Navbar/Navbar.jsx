import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBars);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <Link to="/">mini apps</Link>
            <div>
                {/* Add a class to the div element to show/hide the menu */}
                <div className={isOpen ? 'show' : 'hide'}>
                    <Link to="/">Home</Link>
                    <Link to="/calculator">Calculator</Link>
                    <Link to="/clock">Clock</Link>
                    <Link to="/minesweeper">Minesweeper</Link>
                    <Link to="/rockpaperscissors">Rock Paper Scissors</Link>
                    <Link to="/tictactoe">Tic Tac Toe</Link>
                    <Link to="/todolist">Todo List</Link>
                </div>
                <FontAwesomeIcon  icon={faBars} onClick={handleMenuClick}/>
            </div>
            {/* Display the name of the current app/page in the center of the navbar */}
            <span>{window.location.pathname.substring(1)}</span>
        </nav>
    );
};

export default Navbar;