import './AnalogClock.css';
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';
import ram from './ram.png'

import {useState, useEffect} from 'react';

function AnalogClock(props) {

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const hour = date.getHours() * 30 + 180; // 360/12 = 30 each hour it rotates 30deg +180 (initial design at 0 deg was upside down so to fix it i rotate 180deg..// see the design at 0deg for more clarification)
    const minute = date.getMinutes() * 6 + 180; // 360/60 = 6 each minutes it rotate 6deg + 180(same as above to ...see at 0 deg)
    const second = date.getSeconds() * 6 + 180; // // 360/60 = 6 each minutes it rotate 6deg + 180(look at 0 deg for more clarification)

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    document.body.style.overflow='hidden';

    return (
        <div className='clock-background'>
            <Navbar appName="Hi-IQ Clock" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <div className='clock-container'>
                <div className="analong-clock-container">
                    <div className="clock">
                        <div
                            className="hour-hand"
                            style={{
                                transform: 'rotate(' + hour + 'deg)'
                            }}
                        />
                        <div
                            className="minute-hand"
                            style={{
                                transform: 'rotate(' + minute + 'deg)'
                            }}
                        />
                        <div
                            className="second-hand"
                            style={{
                                transform: 'rotate(' + second + 'deg)'
                            }}
                        />
                        <div className="brand"/>
                    </div>
                </div>
            </div>
            <div className='pic'><img src={ram} alt=""/> </div>
        </div>
    );
}

export default AnalogClock;