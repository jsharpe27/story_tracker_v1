import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import SignOut from './auth/SignOut'

export default function UserHeader() {
  
    const {authUser} = useContext(AuthContext)

  return (
    <div>
      <div className='bg-blue-950 text-white p-10'>
          { authUser ? <h1>Welcome, {authUser.email}</h1> : "" }
      </div>
      <SignOut />
    </div>
  )
}
