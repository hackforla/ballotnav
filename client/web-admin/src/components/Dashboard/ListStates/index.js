import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import { List, ListItem, ListItemText } from '@material-ui/core'
import Header from 'components/Dashboard/Layout/Header'

function SearchStates() {
  const history = useHistory()
  const [states, setStates] = useState([])

  useEffect(() => {
    api.states.list().then((states) => {
      setStates(states)
    })
  }, [])

  return (
    <>
      <Header title='Select a state.' />
      <List>
        {states.map((state) => (
          <ListItem
            key={state.id}
            button
            onClick={() => history.push(`/states/${state.id}`)}
          >
            <ListItemText primary={state.name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default SearchStates
