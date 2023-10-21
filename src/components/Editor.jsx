import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'


export default function Editor() {
  const [value, setValue] = useState('')

  let toolBarOptions = [
    ['bold', 'italic', 'underline'],        // toggled buttons
    ['blockquote'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  
  
  const module = {
        toolbar: toolBarOptions
  }

  return (
  <main className='min-h-screen flex flex-col
        items-center p-24 
       bg-gray-200'>
      <Link to='/' className='underline'>Back to story tracker</Link>
      <h1 className='text-5xl font-semibold'>Brainstorm or write a story</h1>


      <div className='mt-10'>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
      </div>
  </main>
  )

}
