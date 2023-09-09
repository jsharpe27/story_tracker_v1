import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { storiesCollection, db } from "./firebase"
import Welcome from './components/Welcome'
import AddStory from './components/AddStory'
import Card from './components/Card'

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

async function addStory({title, wordCount, isSubmitted, description}){
    const newStory = {
        title: title,
        wordCount: wordCount,
        isSubmitted: isSubmitted,
        description: description
    }
    await addDoc(storiesCollection, newStory)
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
      <Welcome />
      <AddStory handleAddStory={addStory} />
      {storyCardElements}
    </>
  )
}

export default App
