import React, { useState, useEffect } from 'react'
import { useNotesContext } from '../context/NotesContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import SavedNotesBar from './SavedNotesBar'
import { toolBarOptions } from './utils/utils'

import { notesCollection } from '../firebase'
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'

export default function Editor() {
  const [value, setValue] = useState('')
  const [notesExist, setNotesExist] = useState(false)

  const { notesData, setNotesData} = useNotesContext()

  const module = {
    toolbar: toolBarOptions
  }
  
  //map over value state to create child elements of the menubar component items. Do I need context?
  function handleSaveNote(){
    function stripHtmlTags(str){
      if ((str===null) || (str===''))
          return false;
      else
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
    }
    const plainText = stripHtmlTags(value)
    console.log(notesData)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function(snapshot){
       const currentUser = snapshot._firestore._authCredentials.currentUser.uid
       const userNotesArray = []

       snapshot.docs.forEach(doc => {
        const userNote = doc._document.data.value.mapValue.fields.userId.stringValue
          if (currentUser === userNote){
              const userNoteObject = {
                ...doc.data(),
                id: doc.id
                }
            userNotesArray.push(userNoteObject)
            setNotesExist(true)
          }
       })
       setNotesData(userNotesArray)
    })
    return unsubscribe
  },[])

  return (
  <div>
      {notesExist ? <SavedNotesBar /> : <h1>Your notes will appear here</h1>}
      <main className='min-h-screen flex flex-col
            items-center p-24 
          bg-gray-400'>
          <Link to='/' className='underline'>Back to story tracker</Link>
          <h1 className='text-5xl font-semibold'>Brainstorm here</h1>

          <div className='mt-10'>
              <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />                
          </div>
          <button onClick={handleSaveNote}>Save note</button>   
      </main>
  </div>
  )

}
