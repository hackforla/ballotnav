import React from 'react'
import EditTable from './EditTable'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AutoForm from 'components/core/AutoForm'

function SubmodelTab({ model, instances, displayName, tabLabel, listKey, onChange }) {

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
      <Accordion style={{ marginBottom: 15 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={`accordion-add-new-${displayName}`}
        >
          Add New {displayName}
        </AccordionSummary>
        <AccordionDetails>
          <AutoForm
            model={model}
            initialValues={null}
            submitText={`Add ${displayName}`}
            onSubmit={(values, funcs) => {
              addInstance(values)
              funcs.setSubmitting(false)
            }}
            style={{ maxWidth: 400 }}
          />
        </AccordionDetails>
      </Accordion>
      <EditTable
        model={model}
        instances={instances}
        tabLabel={tabLabel}
        onChangeInstance={updateInstance}
        onChange={console.log}
      />
    </>
  )
}

export default SubmodelTab
