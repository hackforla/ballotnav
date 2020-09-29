import React from 'react'
import { useLocation } from 'react-router-dom'
import EditInstance from './EditInstance'
import SearchInstances from './SearchInstances'

const BASE_PATH = '/models'

function ModelEditor({ model }) {
  const location = useLocation()
  const path = location.pathname.replace(BASE_PATH, '').slice(1).split('/')

  if (path.length % 2 === 0) {
    const instanceId = path[path.length - 1]
    const modelName = path[path.length - 2]
    return (
      <EditInstance
        modelName={modelName}
        instanceId={instanceId}
      />
    )
  } else {
    const modelName = path[path.length - 1]
    return (
      <SearchInstances modelName={modelName} />
    )
  }
}

export default ModelEditor
