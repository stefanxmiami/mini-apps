import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Navbar/Menu';
import './style/style.css'

function Rps() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [playerWins, setPlayerWins] = useState(0);
    const [computerWins, setComputerWins] = useState(0);
    const [ties, setTies] = useState(0);

    const choices = ['rock', 'paper', 'scissors'];

    function play(choice) {
        setPlayerChoice(choice);
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult('T');
            setTies(ties + 1);
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'paper' && computerChoice === 'rock') ||
            (choice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('W');
            setPlayerWins(playerWins + 1);
        } else {
            setResult('L');
            setComputerWins(computerWins + 1);
        }
    }

    function handlePlayAgain() {
        setPlayerChoice(null);
        setResult(null);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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

                <div className="scoreboard">
                    <div className="player-wins">Player wins: {playerWins}</div>
                    <div className="computer-wins">Computer wins: {computerWins}</div>
                    <div className="ties">Ties: {ties}</div>
                </div>
                <div className="player-choice">You chose: {playerChoice}</div>
                <div className="computer-choice">Computer chose: {computerChoice}</div>
                {result !== null && (
                    <div className="result">
                        {result === 'T' ? 'It\'s a tie!' : result === 'W' ? 'You win!' : 'You lose!'}
                    </div>
                )}
                <button className="play-again-button" onClick={handlePlayAgain}>Play again</button>
            </div>
        </>
    );
}

export default Rps;