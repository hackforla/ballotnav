import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import { List, ListItem, ListItemText } from '@material-ui/core'
import InstancesTable from './InstancesTable'

function ListInstances({ model, modelPath, basepath }) {
  const [instances, setInstances] = useState(null)
  const history = useHistory()

  useEffect(() => {
    api.models.listInstances(modelPath).then(instances => {
      setInstances(instances)
    })
  }, [model.name])

  if (!instances) return null
  return <InstancesTable model={model} instances={instances} basepath={basepath} />
  return (
    <List>
      <ListItem
        button
        onClick={() => history.push(`${basepath}/new`)}
      >
        <ListItemText primary={`Add new ${model.name}`} />
      </ListItem>
      {instances.map((instance) => (
        <ListItem
          key={instance.id}
          button
          onClick={() => history.push(`${basepath}/${instance.id}`)}
        >
          <ListItemText primary={instance.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default ListInstances
