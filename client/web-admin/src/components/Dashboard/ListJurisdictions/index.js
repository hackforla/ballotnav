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
    api.jurisdictions.listMine().then(jurisdictions => {
      console.log(jurisdictions)
      const transformed = jurisdictions.map(jurisdiction => ({
        id: jurisdiction.id,
        jurisdiction: jurisdiction.name,
        state: jurisdiction.state.name,
        'last updated': moment(jurisdiction.updatedAt).format('MMM Do / hh:MM a'),
        status: (() => {
          if (!jurisdiction.wipJurisdiction) return 'No work in progress'
          if (!jurisdiction.wipJurisdiction.isReleased) return 'Work in progress'
          return 'Released for review'
        })(),

        // TODO: remove
        editBasisWipJurisdictionId: jurisdiction.wipJurisdiction ? jurisdiction.wipJurisdiction.editBasisWipJurisdictionId : 'unknown',
        hasWipJurisdiction: jurisdiction.wipJurisdiction ? 'true' : 'false',
        isReleased: jurisdiction.wipJurisdiction ? jurisdiction.wipJurisdiction.isReleased.toString() : 'unknown',
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
          'last updated',
          'status',

          // TODO: remove
          'editBasisWipJurisdictionId',
          'hasWipJurisdiction',
          'isReleased'
        ]}
        rows={jurisdictions}
        buttonText='Select'
        onClickButton={(id) => history.push(`/jurisdictions/${id}`)}
      />
    </>
  )
}

export default Jurisdictions
