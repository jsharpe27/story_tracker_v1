import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../firebase'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={signIn}>
            <h3>Sign In to Trakr!</h3>
            <label htmlFor='email'>Email</label>
                <input type='email' id='email' 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            <label htmlFor='password'>Password</label>
                <input type='password' id='password' 
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