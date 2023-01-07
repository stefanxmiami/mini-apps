import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faTrophy, faBars } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = ({ appName, handleMenuClick }) => {
    return (
        <nav className='navbar'>
            <Link className='navbar-left' to="/">
                <FontAwesomeIcon icon={faTrophy} />
                <span className="logo"> Mini Apps</span>
            </Link>
            <div className="nav-center"><span className="app-name">{appName}</span></div>
            <div className="nav-right">
                <FontAwesomeIcon icon={faBars} size='lg' onClick={handleMenuClick} />
            </div>
        </nav>
    );
};

export default Navbar;