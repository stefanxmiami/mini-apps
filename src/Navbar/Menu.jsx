import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'

const Menu = () => {
    return (
        <nav className='menu-items'>
            <div className="dropdown-menu">
                <Link className='menu-item' href="#">App 1</Link>
                <Link className='menu-item' href="#">App 2</Link>
                <Link className='menu-item' href="#">App 3</Link>
                <Link className='menu-item' href="#">App 4</Link>
                <Link className='menu-item' href="#">App 5</Link>
                <Link className='menu-item' href="#">App 6</Link>
            </div>
        </nav>
    );
};

export default Menu;