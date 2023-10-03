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
                  backgroundImage: "url('/typewriter.jpg')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <div className='mb-20 '>
                  <Header />
                </div>

                <div className='flex flex-col justify-center mt-[-3rem]'>
                    <div className='flex flex-col items-center text-center'>
                      <SignIn />
                    </div>
                </div>
                
                <div className='flex flex-col justify-center items-center bg-black md:bg-inherit sm:bg-inherit gap-10 '>
                  <Info />
                  <div className='md:bg-black p-10'>
                    <SignUp />
                  </div>
                </div>
              </div>
              
            </div>
           
          </>
        }

        { start &&
          <main className='absolute inset-0'
          style={{
            backgroundImage: "url('/editing.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          >
            <UserHeader />
            <div className='flex flex-col items-center '>
              <Card />
              <AddStory />
            </div>
          </main>
        }
    </AuthProvider>
    </>
  )
}

export default App
