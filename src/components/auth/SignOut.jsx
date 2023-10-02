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
        <button className='h-[2rem] w-[7rem] bg-black 
        text-white gap-2 outline-none transition-all 
        focus:scale-110 hover:scale-110 hover:bg-gray-950 
        active:scale-105 
        disabled:scale-100 disabled:bg-opacity-65
                ' onClick={userSignOut}>Sign Out</button>
  )
}
