import { useState, useEffect } from 'react'

import HomePage from './components/HomePage'
import UserPage from './components/UserPage'
import Editor from './components/Editor'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 const [start, setStart] = useState(false)

 useEffect(() => {
  const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
          setStart(true)
      } else {
          setStart(false)
      }
  })
  return () => listen()
},[])

  return (
    <Router>
      <AuthProvider>
          { !start && <HomePage /> }
          {start && (
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        )}
      </AuthProvider>
    </Router>
  )
}

export default App
