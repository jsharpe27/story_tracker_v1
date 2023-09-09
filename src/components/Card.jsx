import React from 'react'

const Card = ({title, wordCount, isSubmitted, description}) => {
  return (
    <>
      <div>Title:{title}</div>
      <div>Word count: {wordCount}</div>
      <div>Submitted: {isSubmitted}</div>
      <div>Description {description}</div>
    </>
  )
}

export default Card