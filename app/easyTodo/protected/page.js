"use client"

import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { getTodo } from './services/todo-services';
import { Navigation } from './components/navigation';
import { Overview } from './overview';
import ManageTodo from './manage-todo';
import Link from 'next/link';
import EditTodo from './components/editTodo';

export default function Page() {
    const [todoList, setTodoList] = useState([]); 
    const { user } = useUserAuth();
    const [currentPage, setCurrentPage] = useState("manage");
    
    let todoListHolder;
    async function loadTodo() {
        try {
            if (user) {
                const todo = await getTodo(user.uid);
                setTodoList(todo);
            }
        } catch (error) {
            console.error('Problem getting todo list ' + error);
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
    
    let page;
    if (currentPage == "overview") {
        page = (
            <Overview todoArray={todoList}/>
        )
    } else if (currentPage == "manage") {
        page = (
            <ManageTodo todoArray={todoList}/>
        )
    }

    return (
        <main className="bg-lime-600 w-full h-screen pb-20 overflow-y-auto">
            <div className="flex absolute left-0 top-0 w-48">
                <Link href="./" className="bg-gray-300 p-3"> Back to Selection Page</Link>
            </div>
            <Navigation setPageFunc={setCurrentPage}/>
            {page}
            
        </main>
    );
};
