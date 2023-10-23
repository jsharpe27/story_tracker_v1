import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNotesContext } from '../context/NotesContext'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { notesData } = useNotesContext()

  async function handleDeleteNote(noteId){
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
 }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const listItemElements = notesData.map((note) => {
    return (
      <ListItemButton
        key={note.id}
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemText primary={note.body} />
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
