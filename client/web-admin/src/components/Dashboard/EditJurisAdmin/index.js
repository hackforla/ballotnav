import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import { useToast } from 'components/use-toast'

import Header from 'components/Dashboard/Layout/Header'
import HeaderButtons from './HeaderButtons'
import Editor from '../JurisdictionEditor'

function EditJurisdiction() {
  const { wipJurisdictionId, editorUserId } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [canSaveProgress, setCanSaveProgress] = useState(false)
  const [canPublish, setCanPublish] = useState(true)
  const toast = useToast()

  useEffect(() => {
    api.jurisdictions.getReleased(wipJurisdictionId, editorUserId).then((jurisdiction) => {
      setJurisdiction(jurisdiction)
    })
  }, [wipJurisdictionId, editorUserId])

  const updateJurisdiction = (newJurisdiction) => {
    setJurisdiction({
      ...jurisdiction,
      ...newJurisdiction,
    })
    setCanSaveProgress(true)
  }

  const saveProgress = () => {
    setCanSaveProgress(false)
    setCanPublish(false)
    api.jurisdictions.updateWipJurisdiction(jurisdiction.id, jurisdiction)
      .then(updated => {
        toast({
          severity: 'success',
          autoHideDuration: 3000,
          message: 'Progress saved.',
        })
        setJurisdiction(updated)
        setCanPublish(true)
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
        setCanSaveProgress(true)
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
        setCanPublish(false)
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
      })
  }

  return (
    <>
      <Header title={jurisdiction ? `Jurisdiction: ${jurisdiction.name}` : undefined}>
        <HeaderButtons
          onSaveProgress={saveProgress}
          canSaveProgress={canSaveProgress}
          onPublish={publish}
          canPublish={canPublish}
        />
      </Header>
      <Editor
        jurisdiction={jurisdiction}
        onChange={updateJurisdiction}
      />
    </>
  )
}

export default EditJurisdiction
