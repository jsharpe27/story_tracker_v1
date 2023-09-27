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
        <button className='bg-red-200 text-black 
                font-semibold p-2 rounded-md
                hover:bg-gray-200 
                ' onClick={userSignOut}>Sign Out!</button>
  )
}
