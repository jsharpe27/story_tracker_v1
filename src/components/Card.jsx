import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { storiesCollection, db } from "../firebase"

const Card = () => {
  const [storyData, setStoryData] = useState([])
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editWordCount, setEditWordCount] = useState('')
  const [editIsSubmitted, setEditIsSubmitted] = useState('')
  const [editDescription, setEditDescription] = useState('')

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

 function handleEditClick(){
    setEditing((prevEditing => !prevEditing))
 }

 function handleSaveClick(){
      alert('save button clicked')
 }

  const storyCardElements = storyData.map(function(story){
    return (
      <div key={story.id}>
          { editing ? <input type='text' value={editTitle} placeholder='Update title' onChange={(e) => setEditTitle(e.target.value)} /> : <h4>title: {story.title}</h4> }
          { editing ? <p>wordCount: {editWordCount}</p>  : <p>wordCount: {story.wordCount}</p> }
          { editing ? <p>isSubmitted: {editIsSubmitted}</p> : <p>isSubmitted: {story.isSubmitted}</p> }
          { editing ? <p>description: {editDescription}</p> : <p>description: {story.description}</p> }
          <button onClick={() => setEditing((prevEditing => !prevEditing))}>{ !editing ? 'Edit' : 'Discard changes'}</button>
          { editing ? <button onClick={handleSaveClick}>Save</button> : null}
          <button onClick={() => deleteStory(story.id)}>Delete Story</button> 
      </div> 
    )
  })

  return (
      <div className='bg-red-200 mt-[2rem] hover:cursor-pointer'> 
        {storyCardElements}
      </div>
  )
}

export default Card