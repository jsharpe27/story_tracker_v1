import { useState, useContext, createContext } from 'react'

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState('')

    





    return (
        <NotesContext.Provider value={{ notes, setNotes, note, setNote }}>
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