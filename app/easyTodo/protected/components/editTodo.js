"use client"
import React, { useState , useEffect} from 'react';

function EditTodo({editTodoFunc, selectedTodoObj, closeFormFunc}) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [completion, setCompletion] = useState(true);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const dateString = date;
        const dateParts = dateString.split("-");

        const timeString = time;
        const timeParts = timeString.split(":");

        let todoObj = {
            title: selectedTodoObj.title,
            date: selectedTodoObj.date,
            time: selectedTodoObj.time,
            completed: selectedTodoObj.completed
        };

        if (title) {
            todoObj.title = title;
        }
        if (date) {
            todoObj.date = {
                year: parseInt(dateParts[0], 10),
                month: parseInt(dateParts[1], 10),
                day: parseInt(dateParts[2], 10)
            }
        }
        if (time) {
            todoObj.time = {
                hours: parseInt(timeParts[0], 10),
                minutes: parseInt(timeParts[1], 10),
            }
        }
        if(!completion) {
            todoObj.completed = false;
        }
        
        editTodoFunc(todoObj);

        setTitle("");
        setDate("");
        setTime("");
    }

    const toggleIncomplete = () => setCompletion(false);

    return (
        <div onClick={closeFormFunc} className="absolute w-full h-full bg-gray-700/60 flex items-center justify-center z-10">
            <form 
                onClick={ (event) => event.stopPropagation() }
                onSubmit={handleSubmit}
                className="bg-lime-600 text-black p-5 rounded-lg max-w-md" 
            >
                <h2 className="text-2xl text-center mb-2">Edit Task</h2>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Change title:</label>
                    <input type="text" 
                        onChange={(event) => setTitle(event.target.value)} 
                        value={title} 
                    />
                </div>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Change Date:</label>
                    <input type="date" 
                        onChange={(event) => setDate(event.target.value)} 
                        value={date} 
                        />
                </div>
                <div className="mb-2">
                    <label className="inline-block w-40 text-xl">Change Time:</label>   
                    <input type="time" 
                        onChange={(event) => setTime(event.target.value)} 
                        value={time} 
                    />
                </div>
                <div>
                    <button 
                        type="submit"
                        className="bg-green-700 text-white rounded px-1 hover:bg-green-800"
                    >Update Task</button>
                    <button 
                        type="submit" 
                        onClick={toggleIncomplete}
                        className="bg-yellow-600 text-white rounded px-1 ml-3 hover:bg-yellow-800"
                    >Mark Incomplete</button>
                    <button 
                        type="button" 
                        onClick={closeFormFunc}
                        className="bg-red-700 text-white rounded px-1 ml-3 hover:bg-red-800"
                    >Close Form</button>
                </div>
            </form>
        </div>
    );
};

export default EditTodo;