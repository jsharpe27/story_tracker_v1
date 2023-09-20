import React from 'react'
import { useContext } from 'react'
import { nanoid } from 'nanoid'
import { AuthContext } from '../../context/AuthContext'

const SignIn = () => {
    const { signIn } = useContext(AuthContext)
    const { email, setEmail } = useContext(AuthContext)
    const { password, setPassword } = useContext(AuthContext)

  return (
    <div className='sign-in-container'>
        <form onSubmit={signIn}>
            <h3>Sign In to Trakr!</h3>
            <label htmlFor='email'>Email</label>
                <input type='email' id={nanoid()}
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            <label htmlFor='password'>Password</label>
                <input type='password' id={nanoid()} 
                placeholder='Enter your password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />

            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default SignIn