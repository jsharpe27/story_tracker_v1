import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { storiesCollection, db } from "../firebase"

const Card = () => {
  const [storyData, setStoryData] = useState([])
  const [editTitle, setEditTitle] = useState('')
  const [editWordCount, setEditWordCount] = useState('')
  const [editIsSubmitted, setEditIsSubmitted] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [storiesExist, setStoriesExist] = useState(false)

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
            setStoriesExist(true)
          }
       })
       setStoryData(userStoriesArray)
    })
    return unsubscribe
  },[])

  async function deleteStory(storyId){
    const docRef = doc(db, "stories", storyId)
    await deleteDoc(docRef)
    console.log(storyData)
    if (storyData.length === 0){
      setStoriesExist(false)
    }
 }

 function handleEditClick(storyId){
  setEditTitle('');
  setEditWordCount('');
  setEditIsSubmitted(false); 
  setEditDescription('');
    setStoryData(storyData.map(story => { 
      if (story.id === storyId){
        return {
          ...story,
          editing: !story.editing
        }
      }
      return story
    })) 
}

async function handleSaveClick(id, editTitle, editWordCount, editIsSubmitted, editDescription){ 
  const updatedStoryObject = {
    id: id,
    title: editTitle, 
    wordCount: editWordCount,
    isSubmitted: editIsSubmitted,
    description: editDescription
  }

    if (Object.values(updatedStoryObject).every(Boolean)) {

    try {
    const docRef = doc(db, "stories", id)
    await setDoc(docRef, updatedStoryObject, { merge: true })
    console.log('saved')
  } catch (error){
    console.log(error)
  }
  } else {
  console.log('please fill out all fields')
}
}

  const storyCardElements = storyData.map(function(story){
    return (
      <div key={story.id} className='p-3 flex flex-col border border-black m-[.5rem]
      bg-gray-500 text-white flex-wrap w-1/6 '>
          { story.editing ? <input type='text'
                                   className='text-black'       
                                   value={editTitle} 
                                   required 
                                   placeholder='Update title'  
                                   onChange={(e) => setEditTitle(e.target.value)}
                          /> : <h4>title: {story.title}</h4> }
          { story.editing ? <input type='number'
                                  className='text-black' 
                                   value={editWordCount} 
                                   required 
                                   placeholder='Update word count'  
                                   onChange={(e) => setEditWordCount(e.target.value)}
                            />  : <p>wordCount: {story.wordCount}</p> }
          { story.editing ? <><label>Yes, it's submitted:<input type='radio' 
                                   value={true} 
                                   required
                                   name='isSubmitted'
                                   onChange={(e) => setEditIsSubmitted(e.target.value)}
                            /></label> 
                            <label>No, it's not submitted: <input type='radio' 
                                   value={false} 
                                   required
                                   name='isSubmitted'
                                   onChange={(e) => setEditIsSubmitted(e.target.value)}
                            /></label>
                            </>
                            
                            : <p>isSubmitted: {story.isSubmitted}</p> }
          { story.editing ? <textarea type='text'
                                  className='text-black'
                                  rows={4}
                                  cols={40}
                                  value={editDescription} 
                                  required 
                                  placeholder='Update description' 
                                  onChange={(e) => setEditDescription(e.target.value)}
                            /> : <p>description: {story.description}</p> }
            { story.editing ? <button onClick={() => handleSaveClick(story.id, editTitle, editWordCount, editIsSubmitted, editDescription)}>Save</button> : null}
          <button className='
          h-[2rem] w-[7rem] bg-white 
          text-black outline-none transition-all 
          focus:scale-110 hover:bg-black hover:text-white
          active:scale-105 
          disabled:scale-100 disabled:bg-opacity-65
          ' onClick={() => handleEditClick(story.id)}>{ !story.editing ? 'Edit' : 'Discard changes'}</button>
          <button className='
          h-[2rem] w-[7rem] bg-red-200 
          text-black outline-none transition-all 
          focus:scale-110 hover:bg-black hover:text-red-500
          active:scale-105 
          disabled:scale-100 disabled:bg-opacity-65'
          onClick={() => deleteStory(story.id)}>Delete Story</button> 
      </div>
    )
  })

  return (
    <>
      { storiesExist ? <div><h2 className='text-white text-3xl font-serif mt-[3rem]'>Your stories:</h2> <div className='p-4 flex'>{storyCardElements}</div>
      </div> : <p className='text-white text-3xl font-serif mt-[1rem] mb-[1rem]'>You have no stories tracked (yet).</p>}
    </>
  )
}

export default Card