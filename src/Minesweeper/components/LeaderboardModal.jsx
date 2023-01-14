import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {withRouter} from 'react-router-dom';

const LeaderboardModal = ({isOpen, onClose, gameTime, boardSize}) => {
    const [playerName, setPlayerName] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const leaderboardKey = `leaderboard_size_${boardSize}`

    const handleSubmit = event => {
        event.preventDefault();
        const newLeaderboard = [...leaderboard, {playerName, gameTime}];
        newLeaderboard.sort((a, b) => a.gameTime - b.gameTime);
        if (newLeaderboard.length > 10) {
            newLeaderboard.pop();
        }
        localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
        setLeaderboard(newLeaderboard);
        setPlayerName("");
        setIsFormSubmitted(true);
    }

    useEffect(() => {
        const leaderboardKey = `leaderboard_size_${boardSize}`;
        const storedLeaderboard = JSON.parse(localStorage.getItem(leaderboardKey));
        if (storedLeaderboard) {
            setLeaderboard(storedLeaderboard);
        }
    }, [boardSize]);

    function handleNewGameClick() {
        localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
        window.location.reload();
    }

    const handleResetLeaderboard = () => {
        if (window.confirm("Do you want to delete the leaderboard?")) {
            localStorage.removeItem(leaderboardKey);
            setLeaderboard([]);
        }
    }

    return (
        <div className="modal-content leaderboard-modal">
            <div className="form-leaderboard-wrapper">
                <FontAwesomeIcon onClick={onClose} className="fa-solid fa-x close-modal-btn" icon={faX} size='lg' />
                <form onSubmit={handleSubmit}>
                    <h2 className="leaderboard-modal-title">You won!</h2>
                    <div className="leaderboard-modal-time">Time: {gameTime}</div>
                    <div className="leaderboard-modal-form-group">
                        <label className="leaderboard-modal-label" htmlFor="player-name">Enter your name:</label>
                        <input
                            className="leaderboard-modal-input"
                            type="text"
                            id="player-name"
                            value={playerName}
                            onChange={event => setPlayerName(event.target.value)}
                        />
                    </div>
                    <button className="leaderboard-modal-submit-btn" type="submit" disabled={isFormSubmitted}>Submit
                    </button>
                </form>
                <div className="leaderboard-modal-leaderboard">
                    <h3>Leaderboard</h3>
                    <ol className="leaderboard-modal-list">
                        {leaderboard.map((entry, index) => (
                            <li className="leaderboard-modal-list-item" key={index}>
                                {entry.playerName} <span className="leaderboard-time">{entry.gameTime}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="buttons">
                <button className="new-game-btn" onClick={handleNewGameClick}>New Game</button>
                <button className="reset-leaderboard" onClick={handleResetLeaderboard}>Reset</button>
            </div>
        </div>
    );
};

export default LeaderboardModal;