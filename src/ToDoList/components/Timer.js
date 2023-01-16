import React, { useEffect, useState } from 'react';

const Timer = ({ dueDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const time = (dueDate - new Date()) / 1000;
            if (time > 0) {
                const days = Math.floor(time / 86400);
                const hours = Math.floor((time % 86400) / 3600);
                if (days > 0) {
                    setTimeRemaining(`${days} days and ${hours} hours left`);
                } else {
                    setTimeRemaining(`${hours} hours left`);
                }
            } else {
                setTimeRemaining('Overdue');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {timeRemaining && timeRemaining}
        </div>
    );
}

export default Timer;