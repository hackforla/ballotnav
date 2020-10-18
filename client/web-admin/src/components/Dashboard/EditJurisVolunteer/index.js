import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import { useToast } from 'components/use-toast'

import Header from 'components/Dashboard/Layout/Header'
import HeaderButtons from './HeaderButtons'
import Editor from '../JurisdictionEditor'

function EditJurisdiction() {
  const { jurisdictionId } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)
  const [canSaveProgress, setCanSaveProgress] = useState(false)
  const [canSubmitForReview, setCanSubmitForReview] = useState(true)
  const toast = useToast()

  useEffect(() => {
    api.jurisdictions.getWipJurisdiction(jurisdictionId).then((jurisdiction) => {
      setJurisdiction(jurisdiction)
    })
  }, [jurisdictionId])

  const updateJurisdiction = (newJurisdiction) => {
    setJurisdiction({
      ...jurisdiction,
      ...newJurisdiction,
    })
    setCanSaveProgress(true)
    // setCanSubmitForReview(false)
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
        updateJurisdiction({ isReleased: true })
        setCanSubmitForReview(true)
      })
      .catch(error => {
        toast({
          severity: 'error',
          message: error.message,
        })
        setCanSubmitForReview(true)
      })
  }

  return (
    <>
      <Header title={jurisdiction ? `Jurisdiction: ${jurisdiction.name}` : undefined}>
        <HeaderButtons
          onSaveProgress={saveProgress}
          canSaveProgress={canSaveProgress}
          onSubmitForReview={submitForReview}
          canSubmitForReview={jurisdiction && !jurisdiction.isReleased && !canSaveProgress && canSubmitForReview}
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
