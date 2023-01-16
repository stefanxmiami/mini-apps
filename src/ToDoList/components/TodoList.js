import React, {useState} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Navbar from '../../Navbar/Navbar';
import Menu from '../../Navbar/Menu';
import '../style/item-style.css';
import CompletedTasks from './CompletedTasks';

const TodoList = () => {
    const [todos, setTodos] = useState([
        {text: 'Learn about React', completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 1))},
        {text: 'Build a to-do list app', completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 2))}
    ]);
    const [sortBy, setSortBy] = useState('default');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [editing, setEditing] = useState(null);

    const handleEdit = (index) => {
        setEditing(index);
    }

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        if (event.target.value === 'ending-soon') {
            sortedTodos.sort((a, b) => a.dueDate - b.dueDate);
        } else {
            sortedTodos = [...todos];
        }
    }

    let sortedTodos = [...todos];
    if (sortBy === 'ending-soon') {
        sortedTodos.sort((a, b) => a.dueDate - b.dueDate);
    }

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    }

    const toggleCompleted = (index) => {
        const newTodos = [...todos];
        const completedTask = newTodos.splice(index, 1)[0];
        completedTask.dueDate = null;
        setCompletedTasks([...completedTasks, completedTask]);
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const clearCompletedTasks = () => {
        console.log("clear")
        setCompletedTasks([]);
        /*const remainingTasks = todos.filter(todo => !todo.completed);
        setTodos(remainingTasks);*/
    }

    return (
        <div className="todo-background">
            <Navbar appName="To-Do List" handleMenuClick={handleMenuClick}/>
            {
                isMenuOpen && <Menu/>
            }
            <div className="all-todo-components">
            <div className="main-todo-components">
                <div className="todo-list">
                    <h1>To-Do List</h1>
                    <TodoForm addTodo={addTodo}/>
                    <select className="list-order-select" value={sortBy} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="ending-soon">Ending Soon</option>
                    </select>
                    <ul>
                        {sortedTodos.map((todo, index) => (
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
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <CompletedTasks handleClearCompletedTasks={clearCompletedTasks} completedTasks={completedTasks}/>
            </div>
        </div>
    );
}

export default TodoList;