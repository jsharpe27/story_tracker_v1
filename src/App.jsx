import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { onSnapshot } from 'firebase/firestore'
import { storiesCollection } from "./firebase"
import Welcome from './components/Welcome'
import AddStory from './components/AddStory'
import Card from './components/Card'

function App() {
 const [newUser, setNewUser] = useState(true)
 const [storyData, setStoryData] = useState([])


/* useEffect(() => {
    const unsubscribe = onSnapshot(storiesCollection, function(snapshot){
          const storiesArray = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
          }))
    })
    return unsubscribe
},[]) */

function addStory({title, wordCount, isSubmitted, description}){
    const newStory = {
        id: nanoid(),
        title: title,
        wordCount: wordCount,
        isSubmitted: isSubmitted,
        description: description
    }
    setStoryData(prevStories => [newStory, ...prevStories])
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
