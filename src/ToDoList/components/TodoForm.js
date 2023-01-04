import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPlus);

const TodoForm = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState('');
    const [newTodoDueTime, setNewTodoDueTime] = useState('');

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    const handleDueTimeChange = (event) => {
        setNewTodoDueTime(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo({ text: newTodo, completed: false, dueDate: new Date(newTodoDueTime) });
        setNewTodo('');
        setNewTodoDueTime('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="todo-input" type="text" value={newTodo} onChange={handleChange} placeholder="Enter a new to-do item" />
            <input className="todo-input" type="datetime-local" value={newTodoDueTime} onChange={handleDueTimeChange} />
            <button className="todo-button" type="submit"><FontAwesomeIcon icon={faPlus}/> Add</button>
        </form>
    );
}

export default TodoForm;