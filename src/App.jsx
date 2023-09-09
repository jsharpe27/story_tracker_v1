import { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { storiesCollection } from "./firebase"
import Welcome from './components/Welcome'
import StoryCards from './components/StoryCards'
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
        title: title,
        wordCount: wordCount,
        isSubmitted: isSubmitted,
        description: description
    }
    setStoryData(prevStories => [newStory, ...prevStories])
    console.log(storyData)
} 




  return (
    <>
      { newUser && <Welcome />}
      <StoryCards handleAddStory={addStory}>
        <Card 
        
        
        />
      </StoryCards>
    </>
  )
}

export default App
