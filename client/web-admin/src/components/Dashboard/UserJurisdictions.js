import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import { useHeader } from './Layout'
import ButtonTable from './ButtonTable'
import moment from 'moment'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])
  const { setTitle } = useHeader()

  useEffect(() => {
    api.jurisdictions.listMine().then(jurisdictions => {
      const transformed = jurisdictions.map(jurisdiction => ({
        id: jurisdiction.id,
        jurisdiction: jurisdiction.name,
        state: jurisdiction.state.name,
        'last updated': moment(jurisdiction.updatedAt).format('MMM Do / hh:MM a'),
      }))
      setJurisdictions(transformed)
      setTitle('Select a jurisdiction to edit.')
    })
  }, [setTitle])

  return (
    <ButtonTable
      columns={['jurisdiction', 'state', 'last updated']}
      rows={jurisdictions}
      buttonText='Select'
      onClickButton={(id) => history.push(`/jurisdictions/${id}`)}
    />
  )
}

export default Jurisdictions
