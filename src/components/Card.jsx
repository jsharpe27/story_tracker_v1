import React from 'react'

const Card = ({ id, title, wordCount, isSubmitted, description, handleDelete, userId }) => {
  return (
    <div className='bg-red-200'>
      <div>This Story Id:{id}</div>
      <div>Logged in user's Id:{userId}</div>
      <div>Title:{title}</div>
      <div>Word count: {wordCount}</div>
      <div>Submitted: {isSubmitted}</div>
      <div>Description {description}</div>
      <button onClick={() => handleDelete(id)}>Delete Story</button>
    </div>
  )
}

export default Card