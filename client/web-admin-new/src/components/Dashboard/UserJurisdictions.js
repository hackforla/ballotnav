import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'
import api from 'services/api'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])

  useEffect(() => {
    api.jurisdictions.list().then(setJurisdictions)
  }, [])

  return (
    <List>
      {jurisdictions.map((juris) => (
        <ListItem
          key={juris.id}
          button
          onClick={() => history.push(`/jurisdictions/${juris.id}`)}>
          <ListItemText primary={juris.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default Jurisdictions
