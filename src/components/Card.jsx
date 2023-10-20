import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { storiesCollection, db } from "../firebase"
import { motion } from 'framer-motion'
import { handleSaveClick } from './utils/utils'
import { nanoid } from 'nanoid'

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

  const storyCardElements = storyData.map(function(story){
    return (
      <>
      { story.editing ? <div key={nanoid()} className='p-5 flex flex-col border rounded border-black m-[.5rem]
      bg-gray-700 text-white flex-wrap  items-center'>
          { story.editing ? <input type='text'
                                   className='text-black border border-black'       
                                   value={editTitle} 
                                   required 
                                   placeholder='Update title'  
                                   onChange={(e) => setEditTitle(e.target.value)}
                          /> : <h4>Title: {story.title}</h4> }
          { story.editing ? <input type='number'
                                  className='text-black border border-black' 
                                   value={editWordCount} 
                                   required 
                                   placeholder='Update word count'  
                                   onChange={(e) => setEditWordCount(e.target.value)}
                            />  : <p>Word count: {story.wordCount}</p> }
          { story.editing ? <><label>Yes, it's submitted: {' '}<input type='radio' 
                                   value={true} 
                                   required
                                   name='isSubmitted'
                                   onChange={(e) => setEditIsSubmitted(e.target.value)}
                            /></label> 
                            <label>No, it's not submitted:  {' '} <input type='radio' 
                                   value={false} 
                                   required
                                   name='isSubmitted'
                                   onChange={(e) => setEditIsSubmitted(e.target.value)}
                            /></label>
                            </>
                            
                            : <p>Submitted?: {story.isSubmitted}</p> }
          { story.editing ? <textarea type='text'
                                  className='text-black border border-black'
                                  rows={4}
                                  cols={40}
                                  value={editDescription} 
                                  required 
                                  placeholder='Update description' 
                                  onChange={(e) => setEditDescription(e.target.value)}
                            /> : <p>Description: {story.description}</p> }
            { story.editing ? <button onClick={() => handleSaveClick(story.id, editTitle, editWordCount, editIsSubmitted, editDescription)}
                                className='bg-black text-white py-2 px-5 mt-5 flex w-[7rem] justify-center
                                outline-none transition-all 
                                hover:bg-gray-400 hover:text-black hover:font-medium
                                disabled:scale-100 disabled:bg-opacity-65
                                '
                              >
                                Save</button> : null}
          <div className='flex justify-between mt-auto p-3 gap-10'>
            <button className='bottom-0 left-0 flex justify-center items-center
             w-[7rem] bg-black py-2
            text-white outline-none transition-all 
            hover:bg-gray-400 hover:text-black hover:font-medium
            active:scale-105 
            disabled:scale-100 disabled:bg-opacity-65
            ' onClick={() => handleEditClick(story.id)}>{ !story.editing ? 'Edit' : 'Discard changes'}</button>
            <button className='  bottom-0 right-0 
            flex justify-center items-center
             w-[7rem] bg-red-200 
            text-black outline-none transition-all 
            hover:bg-black hover:text-red-500
            active:scale-105 
            disabled:scale-100 disabled:bg-opacity-65'
            onClick={() => deleteStory(story.id)}>Delete Story</button> 
          </div>
      </div> :
                <div key={nanoid()} className='p-5 flex flex-col border rounded border-black m-[.5rem]
                bg-white text-black flex-wrap  items-center'>
                    { story.editing ? <input type='text'
                                             className='text-black border border-black'       
                                             value={editTitle} 
                                             required 
                                             placeholder='Update title'  
                                             onChange={(e) => setEditTitle(e.target.value)}
                                    /> : <h4>Title: {story.title}</h4> }
                    { story.editing ? <input type='number'
                                            className='text-black border border-black' 
                                             value={editWordCount} 
                                             required 
                                             placeholder='Update word count'  
                                             onChange={(e) => setEditWordCount(e.target.value)}
                                      />  : <p>Word count: {story.wordCount}</p> }
                    { story.editing ? <><label>Yes, it's submitted: {' '}<input type='radio' 
                                             value={true} 
                                             required
                                             name='isSubmitted'
                                             onChange={(e) => setEditIsSubmitted(e.target.value)}
                                      /></label> 
                                      <label>No, it's not submitted:  {' '} <input type='radio' 
                                             value={false} 
                                             required
                                             name='isSubmitted'
                                             onChange={(e) => setEditIsSubmitted(e.target.value)}
                                      /></label>
                                      </>
                                      
                                      : <p>Submitted?: {story.isSubmitted}</p> }
                    { story.editing ? <textarea type='text'
                                            className='text-black border border-black'
                                            rows={4}
                                            cols={40}
                                            value={editDescription} 
                                            required 
                                            placeholder='Update description' 
                                            onChange={(e) => setEditDescription(e.target.value)}
                                      /> : <p>Description: {story.description}</p> }
                      { story.editing ? <button onClick={() => handleSaveClick(story.id, editTitle, editWordCount, editIsSubmitted, editDescription)}
                                          className='bg-black text-white py-2 px-5 mt-5 flex w-[7rem] justify-center
                                          outline-none transition-all 
                                          hover:bg-gray-400 hover:text-black hover:font-medium
                                          disabled:scale-100 disabled:bg-opacity-65
                                          '
                                        >
                                          Save</button> : null}
                    <div className='flex justify-between mt-auto p-3 gap-10'>
                      <button className='bottom-0 left-0 flex justify-center items-center
                       w-[7rem] bg-black py-2
                      text-white outline-none transition-all 
                      hover:bg-gray-400 hover:text-black hover:font-medium
                      active:scale-105 
                      disabled:scale-100 disabled:bg-opacity-65
                      ' onClick={() => handleEditClick(story.id)}>{ !story.editing ? 'Edit' : 'Discard changes'}</button>
                      <button className='  bottom-0 right-0 
                      flex justify-center items-center
                       w-[7rem] bg-red-200 
                      text-black outline-none transition-all 
                      hover:bg-black hover:text-red-500
                      active:scale-105 
                      disabled:scale-100 disabled:bg-opacity-65'
                      onClick={() => deleteStory(story.id)}>Delete Story</button> 
                    </div>
                </div>}
      </>
    )
  })

  return (
    <>
      { storiesExist ? 
      <div className='text-center'>
        <h2 className='text-white text-5xl font-bold font-serif mt-[3rem] '>Your stories:</h2> 
        <motion.div className='p-3 flex'
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          transition={{
            type: "tween",
            duration: 0.5,
        }}
        >
          {storyCardElements}
        </motion.div>
      </div> 

      : <p className='text-white text-3xl font-serif mt-[12rem] mb-[1rem]'>You have no stories tracked (yet).</p>}
    </>
  )
}

export default Card