import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import BrainstormBar from './BrainstormBar'
import { toolBarOptions } from './utils/utils'

export default function Editor() {
  const [value, setValue] = useState('')

  const module = {
    toolbar: toolBarOptions
  }
  

  return (
  <div>
    <BrainstormBar />
    <main className='min-h-screen flex flex-col
          items-center p-24 
        bg-gray-200'>
        <Link to='/' className='underline'>Back to story tracker</Link>
        <h1 className='text-5xl font-semibold'>Brainstorm here</h1>


        <div className='mt-10'>
          <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
        </div>
        <button>Save notes</button>
    </main>
  </div>
  )

}
