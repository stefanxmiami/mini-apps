import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';
import './style/style.css'

function Rps() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const choices = ['rock', 'paper', 'scissors'];

    function play(choice) {
        setPlayerChoice(choice);
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult('T');
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'paper' && computerChoice === 'rock') ||
            (choice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('W');
        } else {
            setResult('L');
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="rps-background">
            <Navbar appName="Rock Paper Scissors" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <div className="rps-game">
                <div className="choices">
                    {choices.map(choice => (
                        <button
                            key={choice}
                            className={choice}
                            onClick={() => play(choice)}
                            disabled={playerChoice !== null}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
                {result !== null && (
                    <div className="result">
                        {result === 'T' ? 'It\'s a tie!' : result === 'W' ? 'You win!' : 'You lose!'}
                    </div>
                )}
                <div className="player-choice">You chose: {playerChoice}</div>
                <div className="computer-choice">Computer chose: {computerChoice}</div>
                <button className="play-again-button" onClick={() => window.location.reload()}>Play again</button>
            </div>
        </div>
    );
}

export default Rps;