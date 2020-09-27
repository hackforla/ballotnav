import React from 'react'
import { useParams } from 'react-router-dom'

function EditState() {
  const { id } = useParams()
  return <div>Edit state { id }</div>
}

export default EditState
