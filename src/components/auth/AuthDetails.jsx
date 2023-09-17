import React from 'react'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)


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


    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out!')
        }).catch((error) => {
            console.log(error)
        })
    }


  return (
    <div>
        {authUser ? <><h1>Welcome, {authUser.email}</h1><button onClick={userSignOut}>Sign Out</button></> 
        : <h1>Welcome, Guest</h1>}
    </div>
  )
}

export default AuthDetails