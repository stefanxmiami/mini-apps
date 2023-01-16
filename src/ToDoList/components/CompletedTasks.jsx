import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const CompletedTasks = ({completedTasks, handleClearCompletedTasks}) => {

    return (
        <div className="completed-tasks-full">
            <div className="comp-tasks-heading-wrapper">
                <h2 className="completed-tasks-heading">Completed Tasks </h2><FontAwesomeIcon onClick={handleClearCompletedTasks}
                                                                                             className="fa-solid fa-x reset-leaderboard-btn"
                                                                                             icon={faTrash}/>
            </div>
            <ul className="completed-list">
                {completedTasks.map((task, index) => (
                    <li key={index}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTasks;