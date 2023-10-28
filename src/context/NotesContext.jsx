import { useState, useContext, createContext } from 'react'

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notesData, setNotesData] = useState([])
    const [value, setValue] = useState('')
    const [selectedNoteId, setSelectedNoteId] = useState('')

    const values = {
        notesData,
        setNotesData,
        value,
        setValue,
        selectedNoteId,
        setSelectedNoteId
    }

    return (
        <NotesContext.Provider value={values}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotesContext(){
    const context = useContext(NotesContext)
    if (!context) {
        throw new Error('useNotesContext must be used within a NotesProvider')
    }
    return context
}