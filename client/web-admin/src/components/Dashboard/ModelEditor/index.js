import React from 'react'
import EditInstance from './EditInstance'
import InstancesList from './InstancesList'
import usePath from './use-path'

function ModelEditor() {
  const { model, pathname, pageType } = usePath()
  switch(pageType) {
    case 'edit': return <EditInstance />
    case 'search': return <InstancesList model={model} basepath={pathname} />
    default: return null
  }
}

export default ModelEditor
