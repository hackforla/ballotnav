import React from 'react'
import { useHistory } from 'react-router-dom'
import usePath from './use-path'

function Breadcrumbs() {
  const { model, modelPath, pageType } = usePath()
  const history = useHistory()
  const crumbs = modelPath.map((modelName, idx) => {
    if (idx === modelPath.length - 1)
      switch(pageType) {
        case 'select': return <div key={idx}>Select a { modelName }</div>
        case 'edit': return <div key={idx}>Edit { modelName }</div>
        case 'add': return <div key={idx}>Add { modelName }</div>
      }
    else
      return (
        <div key={idx}>
          <div>{ modelName }</div>
          <div> -- </div>
        </div>
      )
  })
  console.log(crumbs)

  return (
    <div style={{ display: 'flex', height: 80, backgroundColor: 'red' }}>
      { crumbs }
    </div>
  )
}

export default Breadcrumbs
