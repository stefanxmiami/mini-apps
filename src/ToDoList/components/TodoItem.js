import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faPenToSquare);
library.add(faTrash);

const TodoItem = ({todo, toggleCompleted, deleteTodo, editTodo, updateTodo, editing, dueDate}) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        if (!dueDate) return;
        const interval = setInterval(() => {
            const currentTime = new Date();
            const timeDifference = dueDate - currentTime;
            if (timeDifference > 0) {
                const seconds = Math.floor((timeDifference / 1000) % 60);
                const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                setTimeRemaining({days, hours, minutes, seconds});
            } else {
                setTimeRemaining('Overdue');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateTodo(event.target.elements.text.value);
    }

    return (
        <li>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="text" defaultValue={todo.text}/>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <>
                    <div className='left-content'>
                        <div className='check-time'>
                            <input type="checkbox" checked={todo.completed} onChange={toggleCompleted}/>
                            {timeRemaining === 'Overdue' && <div className='time-remaining'>{timeRemaining}</div>}
                            {timeRemaining && timeRemaining.days > 0 &&
                                <div
                                    className='time-remaining'>{timeRemaining.days} days {timeRemaining.hours} hours</div>}
                            {timeRemaining && timeRemaining.days === 0 && timeRemaining.hours > 0 && <div
                                className='time-remaining'>{timeRemaining.hours} hours {timeRemaining.minutes} minutes</div>}
                            {timeRemaining && timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes > 0 &&
                                <div className='time-remaining'>{timeRemaining.minutes} minutes</div>}
                            {timeRemaining && timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds > 0 &&
                                <div className='time-remaining'>{timeRemaining.seconds} seconds</div>}
                        </div>
                        <div className="todo-text">
                            {todo.text}
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="edit-button" onClick={editTodo}><FontAwesomeIcon icon={faPenToSquare}/> Edit</button>
                        <button className="delete-button" onClick={deleteTodo}><FontAwesomeIcon icon={faTrash}/> Delete</button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TodoItem;
