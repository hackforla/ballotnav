import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'
import api from 'services/api'
import { useHeader } from './Layout'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])
  const { setTitle } = useHeader()

  useEffect(() => {
    api.jurisdictions.listMine().then(jurisdictions => {
      setJurisdictions(jurisdictions)
      setTitle('Select a jurisdiction to edit.')
    })
  }, [setTitle])

  return (
    <List>
      {jurisdictions.map((juris) => (
        <ListItem
          key={juris.id}
          button
          onClick={() => history.push(`/jurisdictions/${juris.id}`)}
        >
          <ListItemText primary={juris.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default Jurisdictions
