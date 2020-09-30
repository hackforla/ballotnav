import React, { useState, useEffect } from 'react'
import usePath from './use-path'
import AutoForm from '../AutoForm'
import { Tabs, Tab } from '@material-ui/core'
import TabPanel from '../TabPanel'
import InstancesList from './InstancesList'
import InstancesAccordion from './InstancesAccordion'

function EditInstance() {
  const { model, instanceId, pathname } = usePath()
  const [tabNum, setTabNum] = useState(0)

  useEffect(() => setTabNum(0), [pathname])

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
          {
            child.children
              ? <InstancesList model={child} pathname={pathname} basepath={`${pathname}/${child.name}`} />
              : <InstancesAccordion model={child} />
          }
        </TabPanel>
      ))}
    </>
  )
}

export default EditInstance
