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
    <div className='bg-black text-white  rounded px-10 flex flex-col  justify-center items-center'>
      <h3 className='text-2xl only:font-medium mt-2 mb-[-1rem]'>Add a story</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col p-5 items-center '>
          <input className='text-black m-2'
                              type="text" 
                              name="title" 
                              placeholder="title"
                              required 
                       />
          <input className='text-black w-fit m-2'
                             type="number" 
                             name="wordCount" 
                             placeholder="word count"
                             required
                      />
          <div className='flex items-center px-5 mb-2'>
            <label className='text-white'>Is Submitted?{' '}<input className='text-black'
                                      type="radio" 
                                      name="isSubmitted" 
                                      value={true}
                                      required
                                />
            {' '}Yes{' '}
            </label>
            <label className='text-white'><input type="radio" 
                          name="isSubmitted" 
                          value={false}
                          required 
                  />
            {' '}No{' '}
            </label>
          </div>
          <textarea className='text-black'
                                name="description" 
                                 placeholder="synopsis"
                                 rows={4}
                                 cols={40}
                                 required 
            />
        <button className='h-[2rem] w-[7rem] bg-gray-800
        text-white font-medium gap-2 outline-none transition-all 
        focus:scale-110 hover:scale-110 hover:bg-green-300 hover:text-black
        active:scale-105 disabled:scale-100 disabled:bg-opacity-65
        mt-5
        '
        >Add Story</button>

        </div>
        
      </form>
    </div>
  )
}

export default AddStory