import React, { useState, useEffect } from 'react'
import { useNotesContext } from '../context/NotesContext'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import SavedNotesBar from './SavedNotesBar'
import { toolBarOptions } from './utils/utils'
import { notesCollection } from '../firebase'
import { onSnapshot, addDoc, deleteDoc } from 'firebase/firestore'

export default function Editor() {
  const [value, setValue] = useState('')
  const [notesExist, setNotesExist] = useState(false)
  const { notesData, setNotesData} = useNotesContext()
  const {authUser} = useContext(AuthContext)

  const module = {
    toolbar: toolBarOptions
  }

  async function addNote(noteObject){
    await addDoc(notesCollection, noteObject)
  }

  function handleSaveNote(){
    function stripHtmlTags(str){
      if ((str===null) || (str===''))
          return false;
      else
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
    }
    const plainText = stripHtmlTags(value)
    const note = {
      body: plainText,
      userId: authUser.uid
    }
    addNote(note)
  }

  function handleDeleteNote(){

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

          <div className='mt-10 gap-3 flex flex-col'>
            <button className='bg-white text-black p-3
            mt-5 flex w-[7rem] justify-center active:scale-105 
            outline-none transition-all font-bold hover:font-bold
          hover:bg-blue-100 hover:text-black 
            disabled:scale-100 disabled:bg-opacity-65'           
            onClick={handleSaveNote}
            >
            Save note</button>
            <button className='bottom-0 right-0 p-3
            flex justify-center items-center
            w-[7rem] bg-red-200 
          text-black outline-none transition-all 
          hover:bg-black hover:text-red-500
            active:scale-105 
            disabled:scale-100 disabled:bg-opacity-65'
            onClick={handleDeleteNote}
            >
            Delete note</button>
          </div>
      </main>
  </div>
  )

}
