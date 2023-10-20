import React from 'react'
import { Link } from 'react-router-dom'

export default function Editor() {
  return (
    <>
        <h1 className='text-2xl'>Welcome to the Editor</h1>
        <Link to='/'>Home</Link>
    </>
  )
}
