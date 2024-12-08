"use client"

import React, { useState } from 'react';
import { TodoList } from './components/todoList';

export default function ManageTodo({todoArray}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [dateObj, setDateObj] = useState({year:0, month:0, day:0});

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
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
        return monthNames[monthNumber - 1];
    }

    let monthString = getMonthName(dateObj.month);

    const handleResetDate = () => setDateObj({year:0, month:0, day:0});

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center">
                <input 
                className="w-40 flex items-center m-5 p-3 mb-2"
                type="date"
                value={selectedDate}
                onChange={handleChangeDate}
                />
                <button className="w-40 bg-yellow-400 m-2 mt-0 p-2"
                    onClick={handleResetDate}
                >Show All Task</button>
                <p className="text-black text-2xl mt-2">Tasks for {monthString} {dateObj.day}, {dateObj.year}</p>
            </div>
            <TodoList todoArray={todoArray} dataDate={dateObj} isCompleted={null} fullInfo={true}/>
        </div>
    );
};
