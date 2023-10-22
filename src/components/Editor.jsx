import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import SavedNotesBar from './SavedNotesBar'
import { toolBarOptions } from './utils/utils'
import { NotesProvider } from '../context/NotesContext'
export default function Editor() {
  const [value, setValue] = useState('')

  const module = {
    toolbar: toolBarOptions
  }
  
  //map over value state to create child elements of the menubar component items. Do I need context?

  return (
  <div>
    <NotesProvider>
      <SavedNotesBar />
      <main className='min-h-screen flex flex-col
            items-center p-24 
          bg-gray-200'>
          <Link to='/' className='underline'>Back to story tracker</Link>
          <h1 className='text-5xl font-semibold'>Brainstorm here</h1>


          <div className='mt-10'>
            <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
          </div>
          <button>Save note</button>
      </main>
    </NotesProvider>
  </div>
  )

}
