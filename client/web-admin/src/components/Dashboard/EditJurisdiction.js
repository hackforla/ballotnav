import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import jurisdictionModel from 'models/jurisdiction'
import locationModel from 'models/location'
import AutoForm from './AutoForm'
import {
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useHeader } from './Layout'
import TabPanel from './TabPanel'

function EditJurisdiction() {
  const { jid } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [tabNum, setTabNum] = useState(0)
  const { setTitle } = useHeader()

  useEffect(() => {
    api.jurisdictions.getById(jid).then((jurisdiction) => {
      setTitle(`Editing jurisdiction: ${jurisdiction.name}`)
      setJurisdiction(jurisdiction)
    })
  }, [jid, setTitle])

  if (!jurisdiction) return null
  return (
    <>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label="Jurisdiction Details" />
        <Tab label="Locations" />
        <Tab label="Important Dates" />
      </Tabs>
      <TabPanel value={tabNum} index={0}>
        <AutoForm
          model={jurisdictionModel}
          initialValues={null}
          submitText="Update Jurisdiction"
          onSubmit={(values, funcs) => {
            console.log(values)
            funcs.setSubmitting(false)
          }}
          style={{ maxWidth: 400 }}
        />
      </TabPanel>
      <TabPanel value={tabNum} index={1}>
        <Accordion style={{ marginBottom: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`accordion-add-new-location`}
          >
            Add New Location
          </AccordionSummary>
          <AccordionDetails>
            <AutoForm
              model={locationModel}
              initialValues={null}
              submitText="Add Location"
              onSubmit={(values, funcs) => {
                console.log(values)
                funcs.setSubmitting(false)
              }}
              style={{ maxWidth: 400 }}
            />
          </AccordionDetails>
        </Accordion>
        {jurisdiction.locations.map((loc) => (
          <Accordion key={loc.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`accordion-${loc.id}`}
            >
              Edit location: {loc.name}
            </AccordionSummary>
            <AccordionDetails>
              <AutoForm
                model={locationModel}
                initialValues={null}
                submitText="Update Location"
                onSubmit={(values, funcs) => {
                  console.log(values)
                  funcs.setSubmitting(false)
                }}
                style={{ maxWidth: 400 }}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </TabPanel>
      <TabPanel value={tabNum} index={2}>
        Important dates
      </TabPanel>
    </>
  )
}

export default EditJurisdiction
