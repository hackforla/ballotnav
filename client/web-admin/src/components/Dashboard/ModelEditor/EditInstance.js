import React from 'react'
import usePath from './use-path'

function EditInstance() {
  const { modelName, instanceId } = usePath()
  return (
    <>
      <div>Edting model name: { modelName }</div>
      <div>Instance id: { instanceId }</div>
    </>
  )
}

export default EditInstance
