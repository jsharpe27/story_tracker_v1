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
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
 const [storyData, setStoryData] = useState([])
 const [currentUser, setCurrentUser] = useState(null)
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



 //I reach out to Firebase and get the data from the stories collection
useEffect(() => {
    const unsubscribe = onSnapshot(storiesCollection, function(snapshot){
       const currentUser = snapshot._firestore._authCredentials.currentUser.uid
      
       console.log(currentUser)

       snapshot.docs.forEach(doc => {
        const userStories = doc._document.data.value.mapValue.fields.userId.stringValue

        if (currentUser === userStories){
          console.log(userStories)
        }
    
       })




          const storiesArray = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
          }))
          setStoryData(storiesArray)
    })
    return unsubscribe
},[])

// I add a story to the stories collection in Firebase
async function addStory(storyObject){
    await addDoc(storiesCollection, storyObject)
}

//I delete a story from the stories collection in Firebase
async function deleteStory(storyId){
   const docRef = doc(db, "stories", storyId)
   await deleteDoc(docRef)
}

//I map over the storyData array and create a Card component for each story
  const storyCardElements = storyData.map(function(story){
    return <Card 
                key={story.id}
                id={story.id}
                title={story.title}
                wordCount={story.wordCount}
                isSubmitted={story.isSubmitted}
                description={story.description}
                handleDelete={deleteStory}
                userId={story.userId}
          />
  })

  
  return (
    <>
    <AuthProvider>
      { !start &&
        <>
          <Header />
          <SignIn />
          <SignUp />
        </>

      }

      <br />
      <br />
      <br />

      {
        start &&
        <>
        <UserHeader />
        <SignOut />
        <AddStory handleAddStory={addStory} />
        {storyCardElements} 
      </>
      }


    </AuthProvider>
    </>
  )
}

export default App
