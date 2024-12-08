"use client"

import React, { useEffect, useState } from 'react';
import { TodoTask } from './todoTask';

export function TodoList({todoArray, dataDate, isCompleted, fullInfo}) {
  const [todoListTasks, setTodoListTasks] = useState([]);

  const sortTasks = (tasks) => {
    let filteredTasks = tasks;

    // checks if it wants to specify completion of task or not
    if (isCompleted != null) {
      filteredTasks = tasks.filter((item) => {
        return item.completed === isCompleted;
      });
    }
    // sorts by time
    tasks.sort((a, b) => {
      const varA = a.time.hours * 60 + a.time.minutes;
      const varB = b.time.hours * 60 + b.time.minutes;
      return varA - varB;
    });

    // if date exists, it filters to that day
    // sorts tasks by ascending date
    if (dataDate.day != 0) {
      let temp = filteredTasks.filter((item) => {
        const { day, month, year } = item.date;
        return (
          day === dataDate.day &&
          month === dataDate.month &&
          year === dataDate.year
        );
      });
      return temp;
    } else {
      tasks.sort((a, b) => {
        const dateA = new Date(a.date.year, a.date.month - 1, a.date.day - 1).getTime();
        const dateB = new Date(b.date.year, b.date.month - 1, b.date.day - 1).getTime();
        return dateA - dateB;
      })
    }

    return tasks;
  };  

  // resets if user wants to show completed, date, or new data
  useEffect(() => {
    const sortedTasks = sortTasks(todoArray);
    setTodoListTasks(sortedTasks);
  }, [todoArray, dataDate, isCompleted]);
  
  return (
    <div className="flex flex-col max-w-screen w-full h-full p-1 text-2xl text-black items-center">
      <ul className="w-full">
        {todoListTasks.map((item) => (
            <li key={item.id}
              className="flex w-full items-center"
            >
              <TodoTask todoObj={item} showFullInfo={fullInfo}/>
            </li>
        ))}
      </ul> 
    </div>
  );
};
