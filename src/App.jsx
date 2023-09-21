import { useState, useEffect } from 'react'
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { storiesCollection, db } from "./firebase"
import './index.css'
import Header from './components/Header'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SignOut from './components/auth/SignOut'
import UserHeader from './components/UserHeader'
import AddStory from './components/AddStory'
import Card from './components/Card'
import { AuthProvider } from './context/AuthContext'


function App() {
 const [storyData, setStoryData] = useState([])

useEffect(() => {
    const unsubscribe = onSnapshot(storiesCollection, function(snapshot){
          const storiesArray = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
          }))
          setStoryData(storiesArray)
    })
    return unsubscribe
},[])

async function addStory(storyObject){
    await addDoc(storiesCollection, storyObject)
}

async function deleteStory(storyId){
   const docRef = doc(db, "stories", storyId)
   await deleteDoc(docRef)
}


  const storyCardElements = storyData.map(function(story){
    return <Card 
                key={story.id}
                id={story.id}
                title={story.title}
                wordCount={story.wordCount}
                isSubmitted={story.isSubmitted}
                description={story.description}
                handleDelete={deleteStory}
          />
  })

  return (
    <>
    <AuthProvider>
      <Header />
      <SignIn />
      <SignUp />
      <br />
      <UserHeader />
      <SignOut />
      <AddStory handleAddStory={addStory} />
        {storyCardElements}
    </AuthProvider>
    </>
  )
}

export default App
