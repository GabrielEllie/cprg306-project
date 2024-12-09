"use client"
import React, { useState } from 'react';

export default function NewTodo({addTodoFunc, closeFormFunc}) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const dateString = date;
        const dateParts = dateString.split("-");

        const timeString = time;
        const timeParts = timeString.split(":");

        let todoObj;

        if(title.length >= 0 && title.length <= 50) {
            todoObj = {
                title: title,
                date:{
                    year: parseInt(dateParts[0], 10),
                    month: parseInt(dateParts[1], 10),
                    day: parseInt(dateParts[2], 10)
                },
                time: {
                    hours: parseInt(timeParts[0], 10),
                    minutes: parseInt(timeParts[1], 10),
                },
                completed: false
            }
        }
        addTodoFunc(todoObj);

        setTitle("");
        setDate("");
        setTime("");
    }

    return (
        <div onClick={closeFormFunc} className="absolute w-full h-full bg-gray-700/60 flex items-center justify-center z-10">
            <form 
                onClick={ (event) => event.stopPropagation() }
                onSubmit={handleSubmit}
                className="bg-lime-600 text-black p-5 rounded-lg max-w-md" 
            >
                <h2 className="text-2xl text-center mb-2">Add a new task</h2>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Title:</label>
                    <input type="text" onChange={(event) => setTitle(event.target.value)} value={title} required/>
                </div>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Date:</label>
                    <input type="date" onChange={(event) => setDate(event.target.value)} value={date} required/>
                </div>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Time:</label>   
                    <input type="time" onChange={(event) => setTime(event.target.value)} value={time} required/>
                </div>
                <div>
                    <button 
                        type="submit"
                        className="bg-green-700 text-white rounded px-1"
                    >Add</button>   
                </div>
            </form>
        </div>
    );
};