"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
// make own sign authentication instead of popup like Github or google
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{user, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
}