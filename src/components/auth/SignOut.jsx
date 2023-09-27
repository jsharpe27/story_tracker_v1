import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export default function SignOut() {
    

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out!')
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
        <button className='bg-red-200 text-black p-2 rounded-md' onClick={userSignOut}>Sign Out!</button>
  )
}
