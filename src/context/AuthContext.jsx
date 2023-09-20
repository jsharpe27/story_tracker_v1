import { createContext } from "react";
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
        }).catch((error) => {
            console.log(error)
        })
    }

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out!')
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return () => listen()
    },[])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, userSignOut, signIn, email, setEmail, password, setPassword }}>
            {children}
        </AuthContext.Provider>
    )
}