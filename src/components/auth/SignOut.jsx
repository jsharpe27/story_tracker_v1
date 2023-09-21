import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'

export default function SignOut() {
    const { email, setEmail } = useContext(AuthContext)
    const { password, setPassword } = useContext(AuthContext)

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out!')
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
        <button onClick={userSignOut}>Sign Out!</button>
    </div>
  )
}
