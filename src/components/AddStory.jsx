import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { addDoc } from 'firebase/firestore'
import { storiesCollection } from '../firebase'

const AddStory = () => {
  const {authUser} = useContext(AuthContext)

  async function addStory(storyObject){
    await addDoc(storiesCollection, storyObject)
  }
  
  function handleSubmit(e){
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const storyObject = { ...formJson, userId: authUser.uid, editing: false}
    addStory(storyObject)
    form.reset()
  }

  return (
    <div className='bg-blue-950 text-white p-10 flex flex-col items-center'>
      <h3 className='text-xl only:font-medium mb-[2rem]'>Add a story below</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col p-5 bg-gray-700'>
          <input className='text-black'
                              type="text" 
                              name="title" 
                              placeholder="title"
                              required 
                       />
          <input className='text-black'
                             type="number" 
                             name="wordCount" 
                             placeholder="word count"
                             required
                      />
          <label>Is Submitted?<input className='text-black'
                                     type="radio" 
                                     name="isSubmitted" 
                                     value={true}
                                     required
                              />
          Yes
          </label>
          <label><input type="radio" 
                        name="isSubmitted" 
                        value={false}
                        required 
                />
          No
          </label>
          <textarea className='text-black'
                                name="description" 
                                 placeholder="synopsis"
                                 rows={4}
                                 cols={40}
                                 required 
            />
        </div>
        <button className='bg-green-200 text-black p-2 rounded-md mt-[1rem]'>Add Story</button>
      </form>
    </div>
  )
}

export default AddStory