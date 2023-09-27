import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import SignOut from './auth/SignOut'

export default function UserHeader() {
  
    const {authUser} = useContext(AuthContext)

  return (
    <div>
      <div className=' flex items-center justify-center p-5 bg-blue-950 text-white'>
          { authUser ? <h1>Welcome, {authUser.email}</h1> : "" }
      </div>
      <SignOut />
    </div>
  )
}
