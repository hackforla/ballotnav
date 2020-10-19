import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import ButtonTable from 'components/core/ButtonTable'
import Header from 'components/Dashboard/Layout/Header'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])

  useEffect(() => {
    api.jurisdictions.listMine().then(jurisdictions => {
      const transformed = jurisdictions.map(juris => ({
        id: juris.id,
        jurisdiction: juris.name,
        state: juris.state.name,
        status: juris.jurisdictionStatus,
      }))
      setJurisdictions(transformed)
    })
  }, [])

  return (
    <>
      <Header title='Select a jurisdiction to edit.' />
      <ButtonTable
        columns={[
          'jurisdiction',
          'state',
          'status',
        ]}
        rows={jurisdictions}
        buttonText='Select'
        onClickButton={({ id }) => history.push(`/jurisdictions/${id}`)}
      />
    </>
  )
}

export default Jurisdictions
