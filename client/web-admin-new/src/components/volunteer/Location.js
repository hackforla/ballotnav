import React from 'react'
// import { useParams } from 'react-router-dom'
import AutoForm from './AutoForm'
import model from 'models/location'
console.log(model)

function Location() {
  // const { jid, lid } = useParams()
  return (
    <AutoForm
      model={model}
      initialValues={null}
      onSubmit={(values, funcs) => {
        console.log(values)
        funcs.setSubmitting(false)
      }}
      style={{ maxWidth: 400 }}
    />
  )
}

export default Location
