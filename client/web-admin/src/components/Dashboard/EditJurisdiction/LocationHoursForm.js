import React from 'react'
import model from 'models/location_hours'
import { Box } from '@material-ui/core'
import SubmodelTab from './SubmodelTab'

function LocationHoursForm({ locationName, hours, onChange }) {
  return (
    <Box style={{ padding: 50 }}>
      <h2>Hours for {locationName}</h2>
      <SubmodelTab
        model={{
          editFields: model,
          tableFields: ['beginDate', 'endDate', 'openTime', 'closeTime', 'note'],
        }}
        instances={hours}
        tabLabel='Location Hours'
        displayName='Location Hours'
        onChange={onChange}
        isLocations={false}
      />
    </Box>
  )
}

export default LocationHoursForm
