import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import ButtonTable from 'components/core/ButtonTable'
import moment from 'moment'
import Header from 'components/Dashboard/Layout/Header'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])

  useEffect(() => {
    api.jurisdictions.listReleased().then(jurisdictions => {
      const transformed = jurisdictions.map(jurisdiction => ({
        id: jurisdiction.id,  // for the key in the table
        wipJurisdictionId: jurisdiction.id,
        editorUserId: jurisdiction.editorUserId,
        jurisdiction: jurisdiction.name,
        state: jurisdiction.state.name,
        'last updated': moment(jurisdiction.updatedAt).format('MMM Do / hh:MM a'),
      }))
      setJurisdictions(transformed)
    })
  }, [])

  return (
    <>
      <Header title='Select a jurisdiction to review.' />
      <ButtonTable
        columns={['jurisdiction', 'state', 'last updated']}
        rows={jurisdictions}
        buttonText='Select'
        onClickButton={({ wipJurisdictionId, editorUserId }) => {
          history.push(`/review/${wipJurisdictionId}/${editorUserId}`)
        }}
      />
    </>
  )
}

export default Jurisdictions
