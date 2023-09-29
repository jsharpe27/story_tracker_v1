import { useContext } from 'react'
import { nanoid } from 'nanoid'
import { AuthContext } from '../../context/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const SignIn = () => {
    const { email, setEmail } = useContext(AuthContext)
    const { password, setPassword } = useContext(AuthContext)

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
            setEmail('');
            setPassword('');
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className=''>
        <form onSubmit={signIn}>
            <h3>Sign in </h3>
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