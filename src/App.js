import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar'
import Calculator from './Calculator/Calculator';
import Clock from './Clock/AnalogClock';
import Minesweeper from './Minesweeper/Minesweeper';
import RockPaperScissors from './RockPaperScissors/Rps';
import TicTacToe from './TicTacToe/TicTacToe';
import TodoList from './ToDoList/components/TodoList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/calculator' element={<Calculator/>}></Route>
                <Route path='/clock' element={<Clock/>}></Route>
                <Route path='/minesweeper' element={<Minesweeper/>}></Route>
                <Route path='/rock-paper-scissors' element={<RockPaperScissors/>}></Route>
                <Route path='/tic-tac-toe' element={<TicTacToe/>}></Route>
                <Route path='/todo-list' element={<TodoList/>}></Route>
            </Routes>
        </Router>
    );
};

export default App;