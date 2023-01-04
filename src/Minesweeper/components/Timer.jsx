import React from 'react';
import '../style/style.css'

const Timer = ({ timeElapsed }) => {
    return <div className="timer">Time elapsed: {timeElapsed} seconds</div>;
};

export default Timer;