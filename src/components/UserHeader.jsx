import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import SignOut from './auth/SignOut'

export default function UserHeader() {
  
    const {authUser} = useContext(AuthContext)

  return (
    <div className='flex justify-between bg-blue-950 px-10 py-2 items-center'>
      <div className=' bg-blue-950 text-white'>
          { authUser ? <h1 className='text-2xl'>Welcome, {authUser.email}</h1> : "" }
      </div>
      <SignOut />
    </div>
  )
}
