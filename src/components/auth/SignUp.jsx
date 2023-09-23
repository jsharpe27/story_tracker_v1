import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../firebase'
import { nanoid } from 'nanoid'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
            setEmail('')
            setPassword('')
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={signUp}>
            <h3>Sign Up for StoryTrakr!</h3>
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

            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp