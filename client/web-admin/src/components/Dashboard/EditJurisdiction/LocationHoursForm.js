import React from 'react'
import model from 'models/location_hours'
import { Box } from '@material-ui/core'
import EditTable from './EditTable'
import SubmodelTab from './SubmodelTab'

function LocationHoursForm({ hours }) {
  console.log('hours:', hours)
  return (
    <Box style={{ width: 800 }}>
      {/*<EditTable
        model={{
          editFields: model,
          tableFields: ['beginDate'],
        }}
        instances={hours}
        tabLabel='Location Hours'
        onChangeInstance={console.log}
        isLocations={false}
      />*/}
      <SubmodelTab
        model={{
          editFields: model,
          tableFields: ['beginDate'],
        }}
        instances={hours}
        tabLabel='Location Hours'
        onChangeInstance={console.log}
        isLocations={false}
      />
    </Box>
  )
}

export default LocationHoursForm
