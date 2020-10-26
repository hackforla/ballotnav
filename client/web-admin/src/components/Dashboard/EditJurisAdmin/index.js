import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from 'services/api'
import { useToast } from 'components/use-toast'
import Header from 'components/Dashboard/Layout/Header'
import HeaderButtons from './HeaderButtons'
import Editor from '../JurisdictionEditor'

function EditJurisdiction() {
  const { wipJurisdictionId } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    api.wip.getReleasedJurisdiction(wipJurisdictionId).then(setJurisdiction)
  }, [wipJurisdictionId])

  const updateJurisdiction = (newJurisdiction) => {
    setJurisdiction({ ...jurisdiction, ...newJurisdiction })
    setHasChanges(true)
  }

  const saveProgress = () => {
    setIsSaving(true)
    api.wip.updateJurisdiction(jurisdiction.id, jurisdiction)
      .then(updated => {
        toast({
          severity: 'success',
          autoHideDuration: 3000,
          message: 'Progress saved.',
        })
        setJurisdiction(updated)
        setHasChanges(false)
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
      })
      .finally(() => setIsSaving(false))
  }

  const publish = () => {
    setIsPublishing(true)
    api.wip.publishJurisdiction(jurisdiction.id)
      .then(data => {
        toast({
          severity: 'success',
          autoHideDuration: 5000,
          message: `Published ${jurisdiction.name}.`,
        })
        history.push('/review')
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
        setIsPublishing(false)
      })
  }

  return (
    <>
      <Header title={jurisdiction ? `Jurisdiction: ${jurisdiction.name}` : undefined}>
        <HeaderButtons
          onSaveProgress={saveProgress}
          canSaveProgress={hasChanges && !isSaving}
          onPublish={publish}
          canPublish={!hasChanges && !isPublishing}
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
