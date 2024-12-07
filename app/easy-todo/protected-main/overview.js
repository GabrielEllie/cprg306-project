"use client"

import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { getTodo } from './services/todo-services';

export default function Page() {
    const [todoList, settodoList] = useState([]); 
    const { user } = useUserAuth();
    
    async function loadTodo() {
        try {
            const todo = await getTodo(user.uid);
            settodoList(todo);
        } catch (error) {
            console.error('Problem getting todo list');
        }
    }

    useEffect(() => {
        loadTodo()
    }, [user, todoList]);

    if (!user) {
        return(
            <main>
                <p>You must be logged in to submit a new item.</p>
            </main>
        );
    }

    return (
        <main>
            
        </main>
    );
};
