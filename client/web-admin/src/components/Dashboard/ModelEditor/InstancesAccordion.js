import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import api from 'services/api'
import AutoForm from '../AutoForm'

function InstancesAccordion({ model, modelPath }) {
  const [instances, setInstances] = useState(null)

  useEffect(() => {
    api.models.listInstances(modelPath).then(instances => {
      setInstances(instances)
    })
  }, [model.name])

  if (!instances) return null
  return (
    <>
      <Accordion style={{ marginBottom: 15 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={`accordion-add-new-location`}
        >
          Add New { model.name }
        </AccordionSummary>
        <AccordionDetails>
          <AutoForm
            model={model.fields.default}
            initialValues={null}
            submitText={`Add ${model.name}`}
            onSubmit={(values, funcs) => {
              console.log(values)
              funcs.setSubmitting(false)
            }}
            style={{ maxWidth: 400 }}
          />
        </AccordionDetails>
      </Accordion>
      {instances.map((instance) => (
        <Accordion key={instance.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`accordion-${instance.id}`}
          >
            Edit instance: {instance.name}
          </AccordionSummary>
          <AccordionDetails>
            <AutoForm
              model={model.fields.default}
              initialValues={null}
              submitText={`Update ${model.name}`}
              onSubmit={(values, funcs) => {
                console.log(values)
                funcs.setSubmitting(false)
              }}
              style={{ maxWidth: 400 }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export default InstancesAccordion
