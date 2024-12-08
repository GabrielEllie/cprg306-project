import React from 'react';

export function TodoTask({todoObj}) {
    const {
        title,
        date,
        time,
        completed,
    } = todoObj;
    const { day, month, year } = date;
    const { hours, minutes } = time;
    const standardTime = converToStandardTime();

    function converToStandardTime() {
        const period = hours >= 12 ? 'PM' : 'AM';
        const standardHours = hours % 12 || 12 // This line will make sure that hours cannot be 0
        const paddedMinutes = minutes.toString().padStart(2, '0');

        return `${standardHours}:${paddedMinutes} ${period}`;
    }

    return(
        <div className="max-w-2xl bg-lime-800 m-2 p-4 rounded-lg text-white w-full">
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-2xl">{title}</h3>
                <p >{day}/{month}/{year}</p>
            </div>
            <div className="flex flex-row justify-between">
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
                <p>{standardTime}</p>
            </div>
        </div>
    );
};