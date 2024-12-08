"use client"

import React, { useEffect, useState } from 'react';
import { TodoTask } from './components/todoTask';

export function Overview({todoArray}) {
    // variable will be used to get days that are for today
    const [tasksToday, setTasksToday] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // Gets current date and checks the array if there are tasks to that day
    const getCurrentDate = () => {
        const thisDate = new Date();
        return {
            day: thisDate.getDate(),
            month: thisDate.getMonth() + 1,
            year: thisDate.getFullYear(),
        };
    };

    const filterTasksByDate = (tasks, date, completed) => {
        return tasks.filter((item) => {
            const { day, month, year } = item.date;
            return (
                day === date.day &&
                month === date.month &&
                year === date.year &&
                item.completed === completed
            );
        });
    };

    const sortTasksByTime = (tasks) => {
        return tasks.sort((a, b) => {
            const varA = a.time.hours * 60 + a.time.minutes;
            const varB = b.time.hours * 60 + b.time.minutes;
            return varA - varB;
        });
    };
    
    useEffect(() => {
        const currentDate = getCurrentDate();
        const incompleteTasks = filterTasksByDate(todoArray, currentDate, false);
        const sortedIncompleteTasks = sortTasksByTime(incompleteTasks);
        setTasksToday(sortedIncompleteTasks);

        const completeTasks = filterTasksByDate(todoArray, currentDate, true);
        const sortedCompleteTasks = sortTasksByTime(completeTasks);
        setCompletedTasks(sortedCompleteTasks);
    }, [todoArray]);

    return (
        <div className="flex flex-col items-center text-center w-full">
            <h1 className="text-3xl text-white bg-blue-500 p-2 rounded-t-3xl mt-10" 
            >Today's Tasks</h1>
            <div className="w-full max-w-3xl bg-blue-500 p-4 m-10 mt-0 rounded-3xl">
                <ul className="w-full">
                    {tasksToday.map((item) => (
                        <li className="flex flex-col items-center" key={item.id}>
                            <TodoTask todoObj={item} />
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className="text-3xl text-white bg-gray-500 p-2 rounded-t-3xl mt-5" 
            >Completed Tasks</h1>
            <div className="w-full max-w-3xl bg-gray-500 p-4 m-10 mt-0 rounded-3xl">
                <ul className="w-full">
                    {completedTasks.map((item) => (
                        <li className="flex flex-col items-center" key={item.id}>
                            <TodoTask todoObj={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};