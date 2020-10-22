import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from 'services/api'
import ButtonTable from 'components/core/ButtonTable'
import Header from 'components/Dashboard/Layout/Header'
import { Button } from '@material-ui/core'

function Jurisdictions() {
  const history = useHistory()
  const [jurisdictions, setJurisdictions] = useState([])

  const getJurisdictions = () => {
    api.assignment.listMyJurisdictions().then(jurisdictions => {
      const transformed = jurisdictions.map(juris => ({
        id: juris.id,
        jurisdiction: juris.name,
        state: juris.state.name,
        status: juris.jurisdictionStatus,
      }))
      setJurisdictions(transformed)
    })
  }

  useEffect(() => getJurisdictions(), [])

  return (
    <>
      <Header title='Select a jurisdiction to edit.'>
        <Button onClick={getJurisdictions}>
          <span style={{ color: 'white' }}>
            Refresh List
          </span>
        </Button>
      </Header>
      <ButtonTable
        columns={[
          'jurisdiction',
          'state',
          'status',
        ]}
        rows={jurisdictions}
        buttonText='Select'
        onClickButton={({ id }) => history.push(`/jurisdictions/${id}`)}
        noDataMessage='No jurisdictions have been assigned to you.'
      />
    </>
  )
}

export default Jurisdictions
