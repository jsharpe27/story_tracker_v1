import React from 'react'

const Card = ({id, title, wordCount, isSubmitted, description, handleDelete}) => {
  return (
    <>
      <div>Title:{title}</div>
      <div>Word count: {wordCount}</div>
      <div>Submitted: {isSubmitted}</div>
      <div>Description {description}</div>
      <button onClick={() => handleDelete(id)}>Delete Story</button>
    </>
  )
}

export default Card