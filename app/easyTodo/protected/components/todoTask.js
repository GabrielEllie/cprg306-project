import React from 'react';
import { deleteTodo, updateTodo } from '../services/todo-services';
import { useUserAuth } from '../../_utils/auth-context';

export function TodoTask({todoObj, showFullInfo, onSelect, showEdit}) {
    const { user } = useUserAuth();

    const {
        id,
        title,
        date,
        time,
        completed,
    } = todoObj;
    const { day, month, year } = date;
    const { hours, minutes } = time;
    
    const convertToStandardTime = () => {
        const period = hours >= 12 ? 'PM' : 'AM';
        const standardHours = hours % 12 || 12 // This line will make sure that hours cannot be 0
        const paddedMinutes = minutes.toString().padStart(2, '0');

        return `${standardHours}:${paddedMinutes} ${period}`;
    }

    const getMonthName = (monthNumber) => { 
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
        return monthNames[monthNumber - 1];
    }

    const handleFinish = () => {
        let newObj = {
            title: title,
            date: date,
            time:time,
            completed: true,
        };
        newObj.completed = true;
        updateTodo(user.uid, id, newObj)
    }

    const handleDeleteTodo = () => {
        deleteTodo(user.uid, id);
        alert('Deleting ' + title);
    }

    const monthString = getMonthName(month);
    const standardTime = convertToStandardTime();

    return(
        <div className="max-w-full w-full bg-lime-800 m-2 p-2 rounded-lg text-white "> 
            <div className="flex flex-row justify-between items-center">
                <h3 className="flex text-2xl p-3 overflow-x-auto">{title}</h3>
                <p className="min-w-32 p-3">{standardTime}</p>
            </div>
            {showFullInfo ? (
                <div className="flex flex-row justify-between p-3">
                    <div className="flex items-center">
                        {completed ? (
                                <div className="flex items-center">
                                    <div className="h-4 w-4 bg-green-400 mr-2"></div>
                                    <p>Completed</p>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <div className="h-4 w-4 bg-yellow-400 mr-2"></div>
                                    <p>Not Completed</p>
                                </div>
                            )
                        }
                    </div>
                    <p >{monthString} {day}, {year}</p>
                </div>
            ) : null}
            <div className="flex w-full justify-end">
            {!completed && <button 
                className="w-24 justify-end bg-green-500 m-2 text-black rounded-lg py-1"
                onClick={handleFinish}
            >Finish</button>}   
                
            {showEdit && <div>
                    <button onClick={onSelect}
                    task-id={id}
                    className="w-24 justify-end bg-yellow-500 m-2 text-black rounded-lg py-1"
                    >Edit</button>

                    <button onClick={handleDeleteTodo}
                    className="w-24 justify-end bg-red-500 m-2 text-black rounded-lg py-1"
                    >Delete</button>
                </div>
            }
            
            </div>
        </div>
    );
};