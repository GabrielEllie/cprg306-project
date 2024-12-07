"use client"

import React, { useState } from 'react'
import Login from './components/login';
import SignUp from './components/signup';
import { useUserAuth } from './_utils/auth-context';
import Link from 'next/link';

export default function Page() {
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
        <main>
            {user ? (
                <div>
                    <p><Link href="./components">To Do List</Link></p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
                ) : (
                    <div>
                        {toggleLogin && <Login closeFormsFunc={closeForms} />}
                        {toggleSignup && <SignUp closeFormsFunc={closeForms}/>}
                        <button className="bg-green-700" onClick={handleLoginForm}>Login</button>
                        <button className="bg-gray-500" onClick={handleSignupForm}>Signup</button>
                    </div>
                )
            }
            
        </main>
    );
};
