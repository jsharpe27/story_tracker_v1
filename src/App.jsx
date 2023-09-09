import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { onSnapshot, addDoc } from 'firebase/firestore'
import { storiesCollection } from "./firebase"
import Welcome from './components/Welcome'
import AddStory from './components/AddStory'
import Card from './components/Card'

function App() {
 const [newUser, setNewUser] = useState(true)
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

  const storyCardElements = storyData.map(function(story){
    return <Card 
                key={story.id}
                title={story.title}
                wordCount={story.wordCount}
                isSubmitted={story.isSubmitted}
                description={story.description}
          />
  })


  return (
    <>
      { newUser && <Welcome />}
      <AddStory handleAddStory={addStory} />
      {storyCardElements}
    </>
  )
}

export default App
