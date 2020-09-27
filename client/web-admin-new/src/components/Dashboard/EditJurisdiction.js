import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from 'services/api'
import model from 'models/jurisdiction'
import AutoForm from './AutoForm'
import { Tabs, Tab, Box } from '@material-ui/core'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          { children }
        </Box>
      )}
    </div>
  );
}

function EditJurisdiction() {
  const { jid } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [tabNum, setTabNum] = useState(0)

  useEffect(() => {
    api.jurisdictions.getById(jid).then(setJurisdiction)
  }, [jid])

  if (!jurisdiction) return null
  return (
    <>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label='Jurisdiction' />
        <Tab label='Locations' />
      </Tabs>
      <TabPanel value={tabNum} index={0}>
        <AutoForm
          model={model}
          initialValues={null}
          onSubmit={(values, funcs) => {
            console.log(values)
            funcs.setSubmitting(false)
          }}
          style={{ maxWidth: 400 }}
        />
      </TabPanel>
      <TabPanel value={tabNum} index={1}>
        {jurisdiction.locations.map((loc) => (
          <div key={loc.id}>
            <Link to={`/jurisdictions/${jid}/locations/${loc.id}`}>
              {loc.name}
            </Link>
          </div>
        ))}
      </TabPanel>
    </>
  )
}

export default EditJurisdiction
