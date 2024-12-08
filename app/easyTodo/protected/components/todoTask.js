import React from 'react';

export function TodoTask({todoObj}) {
    let {
        title,
        date,
        time,
        completed,
    } = todoObj;

    let { day, month, year } = date;

    let { hours, minutes } = time;

    return(
        <div className="max-w-2xl bg-lime-800 m-2 p-2 rounded-lg text-white">
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
                <p>{hours}:{minutes}</p>
            </div>
        </div>
    );
};