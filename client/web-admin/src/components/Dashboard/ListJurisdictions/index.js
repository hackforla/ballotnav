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
      const transformed = jurisdictions.map(juris => ({
        id: juris.id,
        jurisdiction: juris.name,
        state: juris.state.name,
        //'last updated': moment(juris.updatedAt).format('MMM Do / hh:MM a'),
        status: (() => {
          if (!juris.wipJurisdiction) return 'No work in progress'
          if (!juris.wipJurisdiction.isReleased) return 'Work in progress'
          return 'Released for review'
        })(),

        // TODO: remove
        editBasisWipJurisdictionId: juris.wipJurisdiction ? juris.wipJurisdiction.editBasisWipJurisdictionId : 'unknown',
        hasWipJurisdiction: juris.wipJurisdiction ? 'true' : 'false',
        isReleased: juris.wipJurisdiction ? juris.wipJurisdiction.isReleased.toString() : 'unknown',
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
          //'last updated',
          'status',

          // TODO: remove
          'editBasisWipJurisdictionId',
          'hasWipJurisdiction',
          'isReleased'
        ]}
        rows={jurisdictions}
        buttonText='Select'
        onClickButton={({ id }) => history.push(`/jurisdictions/${id}`)}
      />
    </>
  )
}

export default Jurisdictions
