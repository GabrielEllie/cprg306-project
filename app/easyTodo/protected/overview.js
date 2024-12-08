import React from 'react';

export function Overview({todoArray}) {
    
    let {
        title,
        date,
        time,
        completed,
    } = todoArray;
    let { day, month, year } = date;
    let { hours, minutes } = time;

    function todoToday() {
        let date = new Date();
        let currentDay = date.getDay();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        console.log(currentMonth);
    }

    return (
        <div>
            
        </div>
    );
};