import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from 'services/api'

function SearchStates() {
  const [states, setStates] = useState([])

  useEffect(() => {
    api.states.list().then(setStates)
  }, [])

  return (
    <div>
      {states.map((state) => (
        <div key={state.id}>
          <Link key={state.id} to={`/states/${state.id}`}>
            {state.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SearchStates
