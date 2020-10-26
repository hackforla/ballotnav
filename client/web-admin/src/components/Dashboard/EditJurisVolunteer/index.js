import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from 'services/api'
import { useToast } from 'components/use-toast'
import Header from 'components/Dashboard/Layout/Header'
import HeaderButtons from './HeaderButtons'
import Editor from '../JurisdictionEditor'

function EditJurisdiction() {
  const { jurisdictionId } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    api.wip.getJurisdiction(jurisdictionId).then(setJurisdiction)
  }, [jurisdictionId])

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

  const submitForReview = () => {
    setIsSubmitting(true)
    api.wip.releaseJurisdiction(jurisdiction.id)
      .then(data => {
        toast({
          severity: 'success',
          autoHideDuration: 5000,
          message: `Released ${jurisdiction.name} for review.`,
        })
        history.push('/jurisdictions')
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
        setIsSubmitting(false)
      })
  }

  return (
    <>
      <Header title={jurisdiction ? `Jurisdiction: ${jurisdiction.name}` : undefined}>
        <HeaderButtons
          onSaveProgress={saveProgress}
          canSaveProgress={hasChanges && !isSaving}
          onSubmitForReview={submitForReview}
          canSubmitForReview={(
            jurisdiction &&
            !jurisdiction.isReleased &&
            !isSubmitting &&
            !hasChanges
          )}
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
