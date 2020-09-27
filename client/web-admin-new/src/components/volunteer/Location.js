import React from 'react'
import { useParams } from 'react-router-dom'

function Location() {
  const { jid, lid } = useParams()
  return <div>Edit Location { lid }</div>
}

export default Location
