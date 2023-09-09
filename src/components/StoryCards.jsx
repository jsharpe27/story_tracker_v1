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
          Story Title: <input name="title" placeholder="enter title here" />
        </label>


      <button>Add Story</button>
      </form>
    </div>
  )
}

export default StoryCards