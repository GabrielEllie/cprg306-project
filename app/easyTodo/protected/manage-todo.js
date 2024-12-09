"use client"

import React, { useState } from 'react';
import { TodoList } from './components/todoList';
import { addTodo, updateTodo, deleteTodo } from './services/todo-services';
import NewTodo from './components/newTodo';
import { useUserAuth } from '../_utils/auth-context';
import EditTodo from './components/editTodo';

export default function ManageTodo({todoArray}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [dateObj, setDateObj] = useState({year:0, month:0, day:0});
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    //this is for updating and deleting
    const [selectedTodo, setselectedTodo] = useState("");
    const { user } = useUserAuth();

    const handleChangeDate = (event) => {
        let dateString = event.target.value;
        let dateParts = dateString.split("-");
        setDateObj({
            year: parseInt(dateParts[0], 10),
            month: parseInt(dateParts[1], 10),
            day: parseInt(dateParts[2], 10)
        });
    }

    const getMonthName = (monthNumber) => { 
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", 
            "August", "September", "October", "November", "December" ]; 
        return monthNames[monthNumber - 1];
    }
    let monthString = getMonthName(dateObj.month);
    const handleResetDate = () => setDateObj({year:0, month:0, day:0});

    const handleNewTask = async (todoObj) => {
        const newTaskId = await addTodo(user.uid, todoObj);
    };
    const openAddForm = () => setShowAddForm(true);
    const closeAddForm = () => setShowAddForm(false);
    const openEditForm = () => setShowEditForm(true);
    const closeEditForm = () => setShowEditForm(false);

    const confirmDelete = () => {
        
    }

    const updateItem = async(item) => {
        let updatedId = await updateTodo(user.uid, selectedTodo.id, item);
    }

    const selectTodo = (event) => {
        openEditForm();
        let selectedId = event.target.getAttribute("task-id");
        setselectedTodo(todoArray.find(todo => todo.id === selectedId));
    }

    return (
        <div className="flex flex-col w-full items-center">
            {showEditForm && <EditTodo editTodoFunc={updateItem} closeFormFunc={closeEditForm} selectedTodoObj={selectedTodo}/>}
            {showAddForm && <NewTodo addTodoFunc={handleNewTask} closeFormFunc={closeAddForm}/>}
            <div className="flex flex-col items-center">
                <input 
                    className="w-40 flex items-center m-5 p-3 mb-2"
                    type="date"
                    value={selectedDate}
                    onChange={handleChangeDate}
                />
                <button 
                    className="w-40 bg-yellow-400 m-2 mt-0 p-2 hover:bg-yellow-600" 
                    onClick={handleResetDate} >Show All Task</button>
                <p className="text-black text-2xl mt-2">Tasks for {monthString} {dateObj.day}, {dateObj.year}</p>
            </div>
            {/* Adding new todo */}
            <button className="absolute top-4 right-8 bg-blue-500 w-20 h-20 text-6xl rounded-3xl hover:bg-blue-700"
                onClick={openAddForm}
            >+</button>
            <TodoList todoArray={todoArray} dataDate={dateObj} isCompleted={null} fullInfo={true} onTodoSelect={selectTodo} toggleEdit={true}/>
        </div>
    );
};
