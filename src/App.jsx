import { useState, useEffect } from 'react'
import Header from './components/Header'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SignOut from './components/auth/SignOut'
import UserHeader from './components/UserHeader'
import AddStory from './components/AddStory'
import Card from './components/Card'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
 const [start, setStart] = useState(false)

 useEffect(() => {
  const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
          setStart(true)
      } else {
          setStart(false)
      }
  })
  return () => listen()
},[])

  return (
    <>
    <AuthProvider>
        { !start &&
          <>
            <Header />
            <SignIn />
            <SignUp />
          </>
        }

        { start &&
          <>
            <UserHeader />
            <SignOut />
            <AddStory />
            <section className='flex justify-center'>
              <Card />
            </section>
          </>
        }
    </AuthProvider>
    </>
  )
}

export default App
