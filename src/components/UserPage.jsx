import React from 'react'
import AddStory from './AddStory'
import Card from './Card'
import UserHeader from './UserHeader'

export default function UserPage() {
  return (
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
  )
}
