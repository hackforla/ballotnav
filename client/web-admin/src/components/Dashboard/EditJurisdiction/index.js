import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import { useToast } from 'components/use-toast'
import { useAuth } from 'components/use-auth'

import { editableFields } from 'models'
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
import Header from 'components/Dashboard/Layout/Header'
import HeaderButtons from './HeaderButtons'
import AdminHeaderButtons from './AdminHeaderButtons'

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
  id: 'importantDates',
  tabLabel: 'Important Dates',
  displayName: 'Important Date',
  model: {
    editFields: importantDateModel,
    tableFields: editableFields(importantDateModel),
  },
  listKey: 'note',
},{
  id: 'infoTabs',
  tabLabel: 'Info Tabs',
  displayName: 'Info Tab',
  model: {
    editFields: infoTabModel,
    tableFields: editableFields(infoTabModel),
  },
  listKey: 'caption',
},{
  id: 'news',
  tabLabel: 'News',
  displayName: 'News',
  model: {
    editFields: newsModel,
    tableFields: editableFields(newsModel),
  },
  listKey: 'caption',
},{
  id: 'notices',
  tabLabel: 'Notices',
  displayName: 'Notice',
  model: {
    editFields: noticeModel,
    tableFields: editableFields(noticeModel),
  },
  listKey: 'message',
},{
  id: 'phones',
  tabLabel: 'Phones',
  displayName: 'Phone',
  model: {
    editFields: phoneModel,
    tableFields: editableFields(phoneModel),
  },
  listKey: 'phoneNumber',
},{
  id: 'urls',
  tabLabel: 'Urls',
  displayName: 'Url',
  model: {
    editFields: urlModel,
    tableFields: editableFields(urlModel),
  },
  listKey: 'name',
}]

function EditJurisdiction() {
  const { id } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [canSaveProgress, setCanSaveProgress] = useState(false)
  const [canSubmitForReview, setCanSubmitForReview] = useState(false)
  const [tabNum, setTabNum] = useState(0)
  const toast = useToast()
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'

  useEffect(() => {
    api.jurisdictions.getWipJurisdiction(id).then((jurisdiction) => {
      setJurisdiction(jurisdiction)
    })
  }, [id])

  const updateJurisdiction = (newJurisdiction) => {
    setJurisdiction({
      ...jurisdiction,
      ...newJurisdiction,
    })
    setCanSaveProgress(true)
    setCanSubmitForReview(false)
  }

  const updateSubmodel = (id, newSubmodel) => {
    setJurisdiction({
      ...jurisdiction,
      [id]: newSubmodel,
    })
    setCanSaveProgress(true)
    setCanSubmitForReview(false)
  }

  const saveProgress = () => {
    setCanSaveProgress(false)
    api.jurisdictions.updateWipJurisdiction(jurisdiction.id, jurisdiction)
      .then(updated => {
        toast({
          severity: 'success',
          autoHideDuration: 3000,
          message: 'Progress saved.',
        })
        console.log('updated jurisdiction', updated)
        setJurisdiction(updated)
        setCanSubmitForReview(true)
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
        setCanSaveProgress(true)
      })
  }

  const submitForReview = () => {
    setCanSubmitForReview(false)
    api.jurisdictions.releaseWipJurisdiction(jurisdiction.id)
      .then(data => {
        toast({
          severity: 'success',
          autoHideDuration: 3000,
          message: 'Jurisdiction released for review.',
        })
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
      })
  }

  const publish = () => {
    api.jurisdictions.publishWipJurisdiction(jurisdiction.id)
      .then(data => {
        toast({
          severity: 'success',
          autoHideDuration: 3000,
          message: 'Jurisdiction published.',
        })
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
      })
  }

  // useEffect(() => console.log('changed:', jurisdiction), [jurisdiction])

  return (
    <>
      <Header title={jurisdiction ? `Jurisdiction: ${jurisdiction.name}` : undefined}>
        {
          isAdmin ? (
            <AdminHeaderButtons
              onSaveProgress={saveProgress}
              canSaveProgress={canSaveProgress}
              onPublish={publish}
              canPublish={!canSaveProgress}
            />
          ) : (
            <HeaderButtons
              onSaveProgress={saveProgress}
              canSaveProgress={canSaveProgress}
              onSubmitForReview={submitForReview}
              canSubmitForReview={canSubmitForReview}
            />
          )
        }

      </Header>
      {jurisdiction && (
        <Box>
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
        </Box>
      )}
    </>
  )
}

export default EditJurisdiction
