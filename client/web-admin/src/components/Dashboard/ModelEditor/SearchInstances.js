import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import api from 'services/api'
import { List, ListItem, ListItemText } from '@material-ui/core'

function SearchInstances({ modelName }) {
  const [instances, setInstances] = useState(null)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    api.models.listInstances(modelName).then(instances => {
      setInstances(instances)
    })
  }, [modelName])

  if (!instances) return null
  return (
    <List>
      {instances.map((instance) => (
        <ListItem
          key={instance.id}
          button
          onClick={() => history.push(`${location.pathname}/${instance.id}`)}
        >
          <ListItemText primary={instance.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default SearchInstances
