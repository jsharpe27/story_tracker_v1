import React from 'react'

const StoryCards = ({handleAddStory}) => {

  function handleSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const storyObj = Object.fromEntries(formData.entries())
    handleAddStory(storyObj)
  }

  return (
    <div>
      <h3>Add a story</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Story Title: <input type="text" name="title" placeholder="enter title here" />
        </label>
        <label>
          Word Count: <input type="number" name="wordCount" placeholder="enter word count" />
        </label>
        <hr />
        <p>
          <label><input type="radio" name="isSubmitted" value={true} />Yes</label>
          <label><input type="radio" name="isSubmitted" value={false} />No</label>
        </p>
        <hr />
        <label>
          Description: <textarea name="description" 
                                 placeholder="enter description" 
                                 rows={4}
                                 cols={40}
                      />
        </label>

      <button>Add Story</button>
      </form>
    </div>
  )
}

export default StoryCards