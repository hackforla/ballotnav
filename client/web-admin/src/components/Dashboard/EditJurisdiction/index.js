import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import { useHeader } from '../Layout'

import jurisdictionModel from 'models/jurisdiction'
import locationModel from 'models/location'
import importantDateModel from 'models/jurisdiction_importantdate'
import infoTabModel from 'models/jurisdiction_infotab'
import newsModel from 'models/jurisdiction_news'
import noticeModel from 'models/jurisdiction_notice'
import phoneModel from 'models/jurisdiction_phone'
import urlModel from 'models/jurisdiction_url'

import { Tab, Tabs, Box } from '@material-ui/core'
import TabPanel from 'components/core/TabPanel'
import JurisdictionTab from './JurisdictionTab'
import SubmodelTab from './SubmodelTab'
import Footer from './Footer'

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
    api.jurisdictions.getWipJurisdiction(id).then((jurisdiction) => {
      setTitle(`Jurisdiction: ${jurisdiction.name}`)
      setJurisdiction(jurisdiction)
    })
  }, [id, setTitle])

  const updateJurisdiction = (newJurisdiction) => {
    setJurisdiction({
      ...jurisdiction,
      ...newJurisdiction,
    })
  }

  const updateSubmodel = (id, newSubmodel) => {
    setJurisdiction({
      ...jurisdiction,
      [id]: newSubmodel,
    })
  }

  const saveProgress = () => {
    console.log('saving:', jurisdiction)
    api.jurisdictions.updateWipJurisdiction(jurisdiction.id, jurisdiction)
      .then(updated => {
        console.log('updated jurisdiction', updated)
        setJurisdiction(updated)
      })
  }

  const submitForReview = () => {
    console.log('submitting:', jurisdiction)
    api.jurisdictions.releaseWipJurisdiction(jurisdiction.id)
      .then(data => {
        console.log('released:', data)
      })
  }

  useEffect(() => {
    console.log('changed:', jurisdiction)
  }, [jurisdiction])

  if (!jurisdiction) return null
  return (
    <Box style={{ paddingBottom: 50 }}>
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
          />
        </TabPanel>
      ))}
      <Footer
        onSaveProgress={saveProgress}
        onSubmitForReview={submitForReview}
      />
    </Box>
  )
}

export default EditJurisdiction
