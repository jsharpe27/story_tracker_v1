import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { storiesCollection, db } from "../firebase"

const Card = () => {
  const [storyData, setStoryData] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(storiesCollection, function(snapshot){
       const currentUser = snapshot._firestore._authCredentials.currentUser.uid
       const userStoriesArray = []

       snapshot.docs.forEach(doc => {
        const userStory = doc._document.data.value.mapValue.fields.userId.stringValue
          if (currentUser === userStory){
              const userStoryObject = {
                ...doc.data(),
                id: doc.id
                }
            userStoriesArray.push(userStoryObject)
          }
       })
       setStoryData(userStoriesArray)
    })
    return unsubscribe
  },[])

  async function deleteStory(storyId){
    const docRef = doc(db, "stories", storyId)
    await deleteDoc(docRef)
 }

  const storyCardElements = storyData.map(function(story){
    return <div key={story.id}>
                
                <h4>title: {story.title}</h4>
                <p>wordCount: {story.wordCount}</p>
                <p></p>isSubmitted: {story.isSubmitted}
                <p>description: {story.description}</p>
                <button onClick={() => handleDelete(story.id)}>Delete Story</button>
            </div> 
  })

  return (
      <div className='bg-red-200 mt-[2rem] hover:cursor-pointer'> 
        {storyCardElements}
      </div>
  )
}

export default Card