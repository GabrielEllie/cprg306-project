"use client"

import React, { useState } from 'react'
import Login from './components/login';
import SignUp from './components/signup';
import { useUserAuth } from './_utils/auth-context';
import Link from 'next/link';

export default function LoginPage() {
    const { user, logout } = useUserAuth(null);
    const [ toggleLogin, setToggleLogin ] = useState(false);
    const [ toggleSignup, setToggleSignup ] = useState(false);

    const handleLoginForm = () => {
        setToggleSignup(false);
        setToggleLogin(true);
    }
    const handleSignupForm = () => {
        setToggleSignup(true);
        setToggleLogin(false);
    }
    const closeForms = () => {
        setToggleSignup(false);
        setToggleLogin(false);
    }

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    } 

    return (
        <main className="flex w-full h-screen justify-center items-center align-middle">
            {user ? (
                // go to app or sign out
                <div className="flex max-w-md max-h-md w-full g-full justify-center items-center align-middle">
                    <Link 
                        className="flex justify-center items-center align-middle bg-green-300 w-full h-16 m-5 border-4 border-green-300 rounded hover:border-blue-600" 
                        href="/easyTodo/protected/">To Do List
                    </Link>
                    <button 
                        className="bg-red-300 w-full h-16 m-5 border-4 border-red-300 rounded hover:border-red-600" 
                        onClick={handleSignOut}
                    >Sign Out</button>
                </div>
                ) : (
                    // login and sign up buttons
                    <div className="flex max-w-md max-h-md w-full g-full justify-center items-center align-middle">
                        {toggleLogin && <Login closeFormsFunc={closeForms} />}
                        {toggleSignup && <SignUp closeFormsFunc={closeForms}/>}
                        <button 
                            className="bg-gray-300 w-full h-16 m-5 border-4 border-gray-300 rounded hover:border-blue-600" 
                            onClick={handleLoginForm}
                        >Login</button>
                        <button 
                            className="bg-gray-300 w-full h-16 m-5 border-4 border-gray-300 rounded hover:border-blue-600" 
                            onClick={handleSignupForm}
                        >Signup</button>
                    </div>
                )
            }
            
        </main>
    );
};
