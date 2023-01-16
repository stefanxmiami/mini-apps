import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPlus);

const TodoForm = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState('');
    const [newTodoDueTime, setNewTodoDueTime] = useState(() => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 60);
        return currentTime.toISOString().slice(0, 16);
    });
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        console.log("handle change set new todo")
        setNewTodo(event.target.value);
    }

    const handleDueTimeChange = (event) => {
        console.log(event.target.value)
        setNewTodoDueTime(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTodo.length < 10) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        let dueDate = new Date(newTodoDueTime);
        if (dueDate.getTime() <= new Date().getTime()) {
            dueDate.setMinutes(dueDate.getMinutes() + 60);
        }
        addTodo({ text: newTodo, completed: false, dueDate });
        setNewTodo('');
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 60);
        setNewTodoDueTime(currentTime.toISOString().slice(0, 16));
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input className={`todo-input ${error ? 'error' : ''}`} type="text" value={newTodo} onChange={handleChange} placeholder="Enter a new to-do item" />
                {error && <div className="error-message" autofocus>Please enter at least 10 characters</div>}
            </div>
            <input className="todo-time-input" type="datetime-local" value={newTodoDueTime} onChange={handleDueTimeChange} />
            <button className="todo-button" type="submit"><FontAwesomeIcon icon={faPlus}/> Add</button>
        </form>
    );
}

export default TodoForm;