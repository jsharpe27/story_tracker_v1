import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import PropTypes from 'prop-types';

const AddStory = ({handleAddStory}) => {
  AddStory.propTypes = {
    handleAddStory: PropTypes.func.isRequired,
  };
  
  const {authUser} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const storyObject = { ...formJson, userId: authUser.uid}
    handleAddStory(storyObject)
    form.reset()
  }

  return (
    <div>
      <h3>Add a story</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Story Title: <input type="text" 
                              name="title" 
                              placeholder="enter title here"
                              required 
                      />
        </label>
        <label>
          Word Count: <input type="number" 
                             name="wordCount" 
                             placeholder="enter word count"
                             required
                      />
        </label>
        <hr />
        <p>
          <label>Is Submitted?<input type="radio" 
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
        </p>
        <hr />
        <label>
          Description: <textarea name="description" 
                                 placeholder="enter description"
                                 rows={4}
                                 cols={40}
                                 required 
                      />
        </label>
        <hr />
      <button>Add Story</button>
      </form>
    </div>
  )
}

export default AddStory