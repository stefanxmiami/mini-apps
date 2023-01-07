import Calculator from './Calculator';
import React, {useState} from "react";
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';

const CalculatorPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <>
            <Navbar appName="Home" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <Calculator/>
        </>
    );
};

export default CalculatorPage;