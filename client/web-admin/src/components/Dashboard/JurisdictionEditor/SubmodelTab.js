import React, { useState } from 'react'
import EditTable from './EditTable'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AutoForm from 'components/core/AutoForm'
import LocationForm from './LocationForm'

function SubmodelTab({ model, instances, displayName, tabLabel, listKey, onChange, isLocations }) {
  const [expanded, setExpanded] = useState(false)

  const addInstance = (newInstance) => {
    onChange([
      newInstance,
      ...instances,
    ])
  }

  const updateInstance = (newInstance) => {
    const newInstances = instances.map(instance => {
      return instance.id === newInstance.id
        ? newInstance
        : instance
    })
    onChange(newInstances)
  }

  return (
    <>
      <Accordion
        style={{ marginBottom: 15 }}
        expanded={expanded}
        onChange={(event, expanded) => setExpanded(expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={`accordion-add-new-${displayName}`}
        >
          Add New {displayName}
        </AccordionSummary>
        <AccordionDetails>
          {
            isLocations
            ? (
              <LocationForm
                initialValues={null}
                submitText={`Add Location`}
                onSubmit={(values, funcs) => {
                  addInstance(values)
                  funcs.setSubmitting(false)
                  funcs.resetForm()
                  setExpanded(false)
                }}
              />
            ) : (
              <AutoForm
                model={model.editFields}
                initialValues={null}
                submitText={`Add ${displayName}`}
                onSubmit={(values, funcs) => {
                  addInstance(values)
                  funcs.setSubmitting(false)
                  funcs.resetForm()
                  setExpanded(false)
                }}
                style={{ maxWidth: 500 }}
              />
            )
          }
        </AccordionDetails>
      </Accordion>
      <EditTable
        model={model}
        instances={instances}
        tabLabel={tabLabel}
        onChangeInstance={updateInstance}
        isLocations={isLocations}
        displayName={displayName}
      />
    </>
  )
}

export default SubmodelTab
