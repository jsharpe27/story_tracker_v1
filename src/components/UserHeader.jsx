import { useAuthContext } from '../context/AuthContext'
import SignOut from './auth/SignOut'
import { Link } from 'react-router-dom'

export default function UserHeader() {
  
    const { authUser } = useAuthContext()

  return (
    <div className='flex justify-center px-10 py-5 gap-10 bg-white font-serif'>
      <div className=' '>
          { authUser ? <h1 className='text-3xl'>Welcome, {authUser.email}</h1> : "" }
      </div>
      <SignOut />
      <Link to='/editor' className='h-[2rem] w-[7rem] bg-blue-500 
        text-white gap-2 outline-none transition-all 
        focus:scale-110 hover:scale-110 
        active:scale-105 flex justify-center items-center
        disabled:scale-100 disabled:bg-opacity-65
      '>Editor</Link>
    </div>
  )
}
