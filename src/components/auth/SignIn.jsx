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
    <div className=' text-white p-8'>
        <form className='flex flex-col items-center mt-[-2rem]' onSubmit={signIn}>
            <label htmlFor='email'></label>
                <input className='text-black m-2 p-2'
                type='email' id={nanoid()}
                placeholder='Enter your email'
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            <label htmlFor='password'></label>
                <input className='text-black m-2 p-2'
                type='password' id={nanoid()} 
                placeholder='Enter your password'
                required
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
            <button className='group flex items-center justify-center 
                    h-[3rem] w-[8rem] bg-black 
                    text-white gap-2 outline-none transition-all 
                    focus:scale-110 hover:scale-110 hover:bg-gray-950 
                    active:scale-105 
                    disabled:scale-100 disabled:bg-opacity-65' type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default SignIn