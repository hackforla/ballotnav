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
      const transformed = jurisdictions.map(juris => ({
        id: juris.id,  // for the key in the table
        wipJurisdictionId: juris.id,
        editorUserId: juris.editorUserId,
        jurisdiction: juris.name,
        state: juris.state.name,
        volunteerName: `${juris.user.firstName} ${juris.user.lastName}`,
        volunteerSlackName: `${juris.user.slackName}`,
        // 'last updated': moment(juris.updatedAt).format('MMM Do / hh:MM a'),
      }))
      setJurisdictions(transformed)
    })
  }, [])

  return (
    <>
      <Header title='Select a jurisdiction to review.' />
      <ButtonTable
        columns={['jurisdiction', 'state', 'volunteerName', 'volunteerSlackName']}
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
