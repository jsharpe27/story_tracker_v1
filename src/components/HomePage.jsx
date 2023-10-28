import React from 'react'
import Header from './Header'
import Info from './Info'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast('signed in successful');

export default function HomePage() {
  return (
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
                      <SignIn notify={notify}/>
                      <Toaster position='top-right' />
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
  )
}
