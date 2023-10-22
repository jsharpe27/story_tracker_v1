import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNotesContext } from '../context/NotesContext'


export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [test, setTest] = React.useState('hello')

  const { notesData, setNotesData} = useNotesContext()

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const listItemElements = notesData.map((note) => {
    return (
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemText primary={note.title} />
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
