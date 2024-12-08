"use client"

import React, { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';

export default function SignUp({closeFormsFunc}) {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { signup } = useUserAuth();

    //loading to show responsiveness
    const [loading, setLoading] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
            
        let user = {
            email: userEmail,
            password: userPassword,
        }

        try {
            setLoading(true);
            await signup(user.email, user.password);
        } catch (error) {
            console.error("Can't log in");
        }
        
        setLoading(false);
        setUserEmail("");
        setUserPassword("");
    };

    return (
        <div className="flex absolute w-full h-full bg-gray-700/60 items-center justify-center">
            <form 
            onClick={ (event) => event.stopPropagation() }
            onSubmit={handleSubmit}
            className="bg-blue-300 text-black p-5 rounded-lg w-3/4 h-1/2 max-w-96 max-h-full"
            >
                <div>
                <h2 className="text-2xl">Signup page</h2>
                <button className="bg-red-400" type="button" onClick={closeFormsFunc} disabled={loading}>back</button>
                </div>
                
                <div>
                    <label>Email: </label>
                    <input 
                    type="email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                    placeholder="example@domain.com"
                    required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                    type="text"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                    placeholder="password"
                    required
                    />
                </div>
                <button type="submit" disabled={loading}>Sign Up</button>
            </form>
        </div>
    );
};
