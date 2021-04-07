import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from 'components/core/Tabs'
import Table from 'components/core/Table'
import AddButton from 'components/core/AddButton'
import models from './models'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: '0.5em',
    borderBottom: '1px #D6D6D6 solid',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
}))

const Submodels = ({ wipJurisdiction: wip }) => {
  const classes = useStyles()
  const [activeModel, setActiveModel] = useState(models[0])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Tabs
          tabs={models}
          activeTab={activeModel}
          onChange={setActiveModel}
          renderTitle={(model) => model.title}
        />
        <AddButton to={`${activeModel.field}/new`} />
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
