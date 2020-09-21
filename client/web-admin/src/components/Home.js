import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import api from 'services/api'

function Home({ user, history }) {
  const [states, setStates] = useState([])

  useEffect(() => {
    if (!user) history.replace('/login')
  }, [user, history])

  useEffect(() => {
    api.states.list().then(setStates)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      {states.map((state) => (
        <div key={state.abbreviation}>{state.name}</div>
      ))}
    </div>
  )
}

export default withRouter(Home)
