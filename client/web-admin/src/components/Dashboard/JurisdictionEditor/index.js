import React, { useState } from 'react'

import jurisdictionModel from 'models/jurisdiction'
import locationModel from 'models/location'
import noticeModel from 'models/jurisdiction_notice'
import phoneModel from 'models/jurisdiction_phone'
import urlModel from 'models/jurisdiction_url'

import { Tab, Tabs } from '@material-ui/core'
import TabPanel from 'components/core/TabPanel'
import JurisdictionTab from './JurisdictionTab'
import SubmodelTab from './SubmodelTab'

const SUBMODELS = [{
  id: 'locations',
  tabLabel: 'Locations',
  displayName: 'Location',
  model: {
    editFields: locationModel,
    tableFields: [
      'name',
      'city',
      'contactName',
      'contactPhone',
      'contactEmail',
    ],
  },
  listKey: 'name',
},{
  id: 'notices',
  tabLabel: 'Notices',
  displayName: 'Notice',
  model: {
    editFields: noticeModel,
    tableFields: Object.keys(noticeModel),
  },
  listKey: 'message',
},{
  id: 'phones',
  tabLabel: 'Phones',
  displayName: 'Phone',
  model: {
    editFields: phoneModel,
    tableFields: Object.keys(phoneModel),
  },
  listKey: 'phoneNumber',
},{
  id: 'urls',
  tabLabel: 'Urls',
  displayName: 'Url',
  model: {
    editFields: urlModel,
    tableFields: Object.keys(urlModel),
  },
  listKey: 'name',
}]

function JurisdictionEditor({ jurisdiction, onChange }) {
  const [tabNum, setTabNum] = useState(0)

  const updateJurisdiction = (newJurisdiction) => {
    onChange({
      ...jurisdiction,
      ...newJurisdiction,
    })
  }

  const updateSubmodel = (id, newSubmodel) => {
    onChange({
      ...jurisdiction,
      [id]: newSubmodel,
    })
  }

  if (!jurisdiction) return null
  return (
    <>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label="Jurisdiction Details" />
        {SUBMODELS.map(submodel => (
          <Tab key={submodel.tabLabel} label={submodel.tabLabel} />
        ))}
      </Tabs>
      <TabPanel value={tabNum} index={0}>
        <JurisdictionTab
          model={jurisdictionModel}
          jurisdiction={jurisdiction}
          onUpdate={updateJurisdiction}
        />
      </TabPanel>
      {SUBMODELS.map((submodel, idx) => (
        <TabPanel key={submodel.id} value={tabNum} index={idx + 1}>
          <SubmodelTab
            model={submodel.model}
            instances={jurisdiction[submodel.id]}
            displayName={submodel.displayName}
            listKey={submodel.listKey}
            tabLabel={submodel.tabLabel}
            onChange={newSubmodel => updateSubmodel(submodel.id, newSubmodel)}
            isLocations={submodel.id === 'locations'}
          />
        </TabPanel>
      ))}
    </>
  )
}

export default JurisdictionEditor
