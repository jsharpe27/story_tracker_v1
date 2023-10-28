import * as React from 'react';
import { useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNotesContext } from '../context/NotesContext'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { notesData, selectedNoteId, setSelectedNoteId, setValue } = useNotesContext()


  async function handleDeleteNote(noteId){
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
 }

 useEffect(() => {
  setSelectedNoteId(notesData[0].id)
  setValue(notesData[0].body)
 },[])


  const handleListItemClick = (index, selectedNoteText, noteId) => {
    setSelectedIndex(index);
    setValue(selectedNoteText);
    setSelectedNoteId(noteId)
  };


  const listItemElements = notesData.map((note, index) => {
    return (
      <ListItemButton
        key={note.id}
        selected={selectedIndex === index}
        onClick={() => handleListItemClick(index, note.body, note.id)}
      >
        <ListItemText primary={note.body.slice(0, 10) + (note.body.length > 10 ? '...' : '')} />
        <button className='bottom-0 right-0 p-1
            flex justify-center items-center
            bg-red-200 
          text-black outline-none transition-all 
          hover:bg-black hover:text-red-500
            active:scale-105 
            disabled:scale-100 disabled:bg-opacity-65'
            onClick={() => handleDeleteNote(note.id)}
            >
            Delete note</button>
      </ListItemButton>
      )
    })

  return (
    <Box sx={{ width: '25%', maxWidth: 360, bgcolor: 'background.paper', position: 'absolute' }}>
      <List component="nav" >
        {listItemElements}
      </List>
    </Box>
  );
}
