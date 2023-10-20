import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import SignOut from './auth/SignOut'


export default function UserHeader() {
  
    const {authUser} = useContext(AuthContext)

  return (
    <div className='flex justify-center px-10 py-5 gap-10 bg-white font-serif'>
      <div className=' '>
          { authUser ? <h1 className='text-3xl'>Welcome, {authUser.email}</h1> : "" }
      </div>
      <SignOut />

    </div>
  )
}
