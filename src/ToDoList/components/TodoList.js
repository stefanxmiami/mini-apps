import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import '../style/item-style.css'

const TodoList = () => {
    const [todos, setTodos] = useState([
        { text: 'Learn about React', completed: false, dueDate: new Date(2023, 0, 5) },
        { text: 'Build a to-do list app', completed: false, dueDate: new Date(2023, 0, 8) }
    ]);

    const [editing, setEditing] = useState(null);

    const handleEdit = (index) => {
        setEditing(index);
    }

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    }

    const toggleCompleted = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    const editTodo = (index) => {
        setEditing(index);
    }

    const updateTodo = (index, text) => {
        const newTodos = [...todos];
        newTodos[index].text = text;
        setTodos(newTodos);
        setEditing(null);
    }

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            <ul>
                {todos.map((todo, index) => (
                    <div className="todo-item">
                        <TodoItem
                        key={index}
                        todo={todo}
                        dueDate={todo.dueDate}
                        toggleCompleted={() => toggleCompleted(index)}
                        deleteTodo={() => deleteTodo(index)}
                        editTodo={() => editTodo(index)}
                        updateTodo={(text) => updateTodo(index, text)}
                        editing={editing === index}
                    /></div>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;