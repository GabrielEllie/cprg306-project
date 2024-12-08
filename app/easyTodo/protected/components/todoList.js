import React from 'react';
import { TodoTask } from './todoTask';

export function TodoList({todoArray}) {
    return (
      <div className="w-full h-full p-1 overflow-y-auto">
        <ul>
            {todoArray.map((item) => (
                <li key={item.id}><TodoTask todoObj={item} /></li>
            ))}
        </ul> 
      </div>
    );
};
