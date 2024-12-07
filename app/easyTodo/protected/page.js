"use client"

import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { getTodo } from './services/todo-services';
import { TodoList } from './components/todoList';
import { Navigation } from './components/navigation';
import tempArray from './temp.json';
import { Overview } from './overview';
import ManageTodo from './manage-todo';

export default function Page() {
    const [todoList, settodoList] = useState([]); 
    const { user } = useUserAuth();
    const [currentPage, setCurrentPage] = useState("overview");
    
    const todoListDummy = tempArray;

    // async function loadTodo() {
    //     try {
    //         const todo = await getTodo(user.uid);
    //         settodoList(todo);
    //     } catch (error) {
    //         console.error('Problem getting todo list');
    //     }
    // }

    // useEffect(() => {
    //     loadTodo()
    // }, [user, todoList]);

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
            <Overview todoArray={todoListDummy}/>
        )
    } else if (currentPage == "manage") {
        page = (
            <ManageTodo todoArray={todoListDummy}/>
        )
    }

    return (
        <main className="bg-lime-600 w-full h-screen pb-20 overflow-y-auto">
            
            <Navigation setPageFunc={setCurrentPage}/>
            {page}
            
        </main>
    );
};
