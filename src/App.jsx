import { useState, useEffect } from 'react'
import Header from './components/Header'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import UserHeader from './components/UserHeader'
import AddStory from './components/AddStory'
import Card from './components/Card'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Info from './components/Info'

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
            <div className='relative min-h-screen'>
              <div
                className='absolute inset-0'
                style={{
                  backgroundImage: "url('./src/assets/typewriter.jpg')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <div className='mb-20 '
                >
                  <Header />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-col items-center text-center'>
                      <SignIn />
                    </div>
                </div>
                <div className='flex justify-center '>
                  <SignUp />
                </div>

                 <Info />
                
              </div>
              
            </div>
           
          </>
        }

        { start &&
          <main>
            <UserHeader />
            <AddStory />
            <Card />
          </main>
        }
    </AuthProvider>
    </>
  )
}

export default App
