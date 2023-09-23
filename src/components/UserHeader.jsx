import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export default function UserHeader() {
  
  //Import the AuthContext and destructure the authUser object
    const {authUser} = useContext(AuthContext)

  return (
    <div>
        { authUser ? <h1>Welcome, {authUser.email}</h1> : "" }
    </div>
  )
}
