import React, { useState, useEffect } from 'react'
import usePath from './use-path'
import AutoForm from '../AutoForm'
import {
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TabPanel from '../TabPanel'
import ListInstances from './ListInstances'

function EditInstance() {
  const { model, instanceId, pathname } = usePath()
  const [tabNum, setTabNum] = useState(0)
  console.log('modelname:', model.name, 'tabNum', tabNum)

  useEffect(() => {
    setTabNum(0)
  }, [pathname])

  return (
    <>
      <div>Editing model name: { model.name }</div>
      <div>Instance id: { instanceId }</div>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label={model.name + ' details'} />
        {model.children.map((child, idx) => {
          const label = child.name + (child.name.endsWith('s') ? '' : 's')
          return <Tab key={child.name} label={label}  />
        })}
      </Tabs>
      <TabPanel value={tabNum} index={0}>
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
      </TabPanel>
      {model.children && model.children.map((child, idx) => (
        <TabPanel key={idx + 1} value={tabNum} index={idx + 1}>
          <ListInstances model={child} pathname={pathname} />
        </TabPanel>
      ))}
    </>
  )
}

export default EditInstance
