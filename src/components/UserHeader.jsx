import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export default function UserHeader() {
    const {authUser} = useContext(AuthContext)
    const {userSignOut} = useContext(AuthContext)

  return (
    <div>
        {authUser ? <><h1>Welcome, {authUser.email}</h1><button onClick={userSignOut}>Sign Out</button></> 
        : <h1>Welcome, Guest</h1>}
    </div>
  )
}
