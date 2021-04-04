import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs'
import Table from 'components/core/Table'
import EditButton from 'components/core/EditButton'
import LocationCheckboxes from './LocationCheckboxes'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: '0.5em',
    borderBottom: '1px #D6D6D6 solid',
  }
}))

const SUBMODELS = [
  {
    title: 'Locations',
    field: 'locations',
    columns: [
      {
        title: 'Location name',
        field: 'name',
        sort: true,
      },
      {
        title: 'City',
        field: 'city',
        sort: true,
      },
      {
        title: 'Contact name',
        field: 'contactName',
        sort: true,
      },
      {
        title: 'Contact phone',
        field: 'contactPhone',
      },
      {
        title: 'Contact email',
        field: 'contactEmail',
      },
      {
        render: (_, { id }) => <EditButton to={`locations/${id}`} />,
        textAlign: 'center',
      },
    ],
    collapse: (location) => <LocationCheckboxes location={location} />,
  },
  {
    title: 'Important Dates',
    field: 'importantDates',
    columns: [],
  },
]

const Submodels = ({ wipJurisdiction: wip }) => {
  const classes = useStyles()
  const [activeModel, setActiveModel] = useState(SUBMODELS[0])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Tabs
          tabs={SUBMODELS}
          activeTab={activeModel}
          onChange={setActiveModel}
        />
      </div>
      <Table
        data={wip[activeModel.field]}
        columns={activeModel.columns}
        collapse={activeModel.collapse}
      />
    </div>
  )
}

export default Submodels
