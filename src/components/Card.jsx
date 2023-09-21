import React from 'react'

const Card = ({id, title, wordCount, isSubmitted, description, handleDelete}) => {
  return (
    <div className='bg-red-200'>
      <div>Id:{id}</div>
      <div>Title:{title}</div>
      <div>Word count: {wordCount}</div>
      <div>Submitted: {isSubmitted}</div>
      <div>Description {description}</div>
      <button onClick={() => handleDelete(id)}>Delete Story</button>
    </div>
  )
}

export default Card