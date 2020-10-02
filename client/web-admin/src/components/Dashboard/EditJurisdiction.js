import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import jurisdictionModel from 'models/jurisdiction'
import locationModel from 'models/location'
import importantDateModel from 'models/jurisdiction_importantdate'
import infoTabModel from 'models/jurisdiction_infotab'
import newsModel from 'models/jurisdiction_news'
import noticeModel from 'models/jurisdiction_notice'
import phoneModel from 'models/jurisdiction_phone'
import urlModel from 'models/jurisdiction_url'
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
import EditTable from './EditTable'

const SUBMODELS = [{
  id: 'locations',
  tabLabel: 'Locations',
  displayName: 'Location',
  model: locationModel,
  listKey: 'name',
},{
  id: 'importantDates',
  tabLabel: 'Important Dates',
  displayName: 'Important Date',
  model: importantDateModel,
  listKey: 'note',
},{
  id: 'infoTabs',
  tabLabel: 'Info Tabs',
  displayName: 'Info Tab',
  model: infoTabModel,
  listKey: 'caption',
},{
  id: 'news',
  tabLabel: 'News',
  displayName: 'News',
  model: newsModel,
  listKey: 'caption',
},{
  id: 'notices',
  tabLabel: 'Notices',
  displayName: 'Notice',
  model: noticeModel,
  listKey: 'message',
},{
  id: 'phones',
  tabLabel: 'Phones',
  displayName: 'Phone',
  model: phoneModel,
  listKey: 'phoneNumber',
},{
  id: 'urls',
  tabLabel: 'Urls',
  displayName: 'Url',
  model: urlModel,
  listKey: 'name',
}]

function EditJurisdiction() {
  const { id } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [tabNum, setTabNum] = useState(0)
  const { setTitle } = useHeader()

  useEffect(() => {
    api.jurisdictions.getById(id).then((jurisdiction) => {
      setTitle(`Jurisdiction: ${jurisdiction.name}, ${jurisdiction.state.name}`)
      setJurisdiction(jurisdiction)
    })
  }, [id, setTitle])

  if (!jurisdiction) return null
  return (
    <>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label="Jurisdiction Details" />
        {SUBMODELS.map(subModel => (
          <Tab key={subModel.tabLabel} label={subModel.tabLabel} />
        ))}
      </Tabs>
      <TabPanel value={tabNum} index={0}>
        <AutoForm
          model={jurisdictionModel}
          initialValues={jurisdiction}
          submitText="Update Jurisdiction"
          onSubmit={(values, funcs) => {
            console.log(values)
            funcs.setSubmitting(false)
          }}
          style={{ maxWidth: 400 }}
        />
      </TabPanel>
      {SUBMODELS.map((subModel, idx) => (
        <TabPanel key={subModel.id} value={tabNum} index={idx + 1}> {/*} change to + 1 when the first tab is back*/}
          <EditTab
            model={subModel.model}
            instances={jurisdiction[subModel.id]}
            displayName={subModel.displayName}
            listKey={subModel.listKey}
            tabLabel={subModel.tabLabel}
          />
        </TabPanel>
      ))}
    </>
  )
}

function EditTab({ model, instances, displayName, tabLabel, listKey }) {
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
              console.log(values)
              funcs.setSubmitting(false)
            }}
            style={{ maxWidth: 400 }}
          />
        </AccordionDetails>
      </Accordion>
      <EditTable model={model} instances={instances} tabLabel={tabLabel} />
    </>
  )
}

export default EditJurisdiction
