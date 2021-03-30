import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    flex: 1,
  },
  jurisdictionName: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 700,
  },
  stateName: {
    color: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 400,
  },
}))

const CurrentJurisdiction = ({ jurisdictionName, stateName }) => {
  const classes = useStyles()

  if (!jurisdictionName || !stateName) return null
  return (
    <div className={classes.title}>
      <div className={classes.jurisdictionName}>
        {jurisdictionName}
      </div>
      <div className={classes.stateName}>{stateName}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  jurisdictionName: select.jurisdiction(state)?.name,
  stateName: select.state(state)?.name,
})

export default connect(mapStateToProps)(CurrentJurisdiction)
