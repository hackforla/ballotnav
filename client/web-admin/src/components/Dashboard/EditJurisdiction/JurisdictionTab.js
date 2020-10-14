import React from 'react'
import AutoForm from 'components/core/AutoForm'

function JurisdictionTab({ model, jurisdiction, onUpdate }) {
  return (
    <AutoForm
      model={model}
      initialValues={jurisdiction}
      submitText="Update Jurisdiction"
      onSubmit={(values, funcs) => {
        onUpdate(values)
        funcs.setSubmitting(false)
      }}
      style={{ maxWidth: 500 }}
    />
  )
}

export default JurisdictionTab
