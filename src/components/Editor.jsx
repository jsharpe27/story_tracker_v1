import React, { useState, useEffect } from 'react'
import { useNotesContext } from '../context/NotesContext'
import { useAuthContext } from '../context/AuthContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import SavedNotesBar from './SavedNotesBar'
import { toolBarOptions } from './utils/utils'
import { notesCollection } from '../firebase'
import { onSnapshot, addDoc, doc, setDoc } from 'firebase/firestore'

export default function Editor() {
  const { setNotesData, selectedNoteId, value, setValue } = useNotesContext()
  const {authUser} = useAuthContext()
  const [notesExist, setNotesExist] = useState(false)

  const module = {
    toolbar: toolBarOptions
  }

  async function addNote(noteObject){
    await addDoc(notesCollection, noteObject)
  }

  function stripHtmlTags(str){
    if ((str===null) || (str===''))
        return false;
    else
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  function handleAddNote(){
    const plainText = stripHtmlTags(value)
    const note = {
      body: plainText,
      userId: authUser.uid
    }
    addNote(note)
  }

  async function handleSaveNote(noteId){ 
   const plainText = stripHtmlTags(value)
   const note = {
    body: plainText,
    id: noteId,
    userId: authUser.uid
    }

    try {
      const docRef = doc(notesCollection, noteId);
      await setDoc(docRef, note);
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
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
          <Link to='/' className='underline text-lg'>Back to story tracker</Link>
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
            onClick={handleAddNote}
            >
            Add Note</button>
            <button className='bg-white text-black p-3
            mt-5 flex w-[7rem] justify-center active:scale-105 
            outline-none transition-all font-bold hover:font-bold
          hover:bg-blue-100 hover:text-black 
            disabled:scale-100 disabled:bg-opacity-65'           
            onClick={() => handleSaveNote(selectedNoteId)}
            >
            Save changes</button>
            
          </div>
      </main>
  </div>
  )

}
