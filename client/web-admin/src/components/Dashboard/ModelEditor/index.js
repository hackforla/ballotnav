import React from 'react'
import EditInstance from './EditInstance'
import SearchInstances from './SearchInstances'
import usePath from './use-path'

function ModelEditor({ model }) {
  const path = usePath()
  switch(path.pageType) {
    case 'edit': return <EditInstance />
    case 'search': return <SearchInstances />
    default: return null
  }
}

export default ModelEditor
