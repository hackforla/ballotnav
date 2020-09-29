import React from 'react'
import { useLocation } from 'react-router-dom'
import EditInstance from './EditInstance'
import SearchInstances from './SearchInstances'
import usePath from './use-path'

const BASE_PATH = '/models'

function ModelEditor({ model }) {
  const path = usePath()
  switch(path.type) {
    case 'edit': return <EditInstance />
    case 'search': return <SearchInstances />
  }
}

export default ModelEditor
