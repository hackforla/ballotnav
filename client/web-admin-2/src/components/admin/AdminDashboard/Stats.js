import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useModalActions from 'store/actions/modals'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 150,
    border: `1px ${theme.palette.primary.main} solid`,
    borderRadius: 10,
    padding: '1em',
    marginBottom: '3em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}))

const JurisdictionStats = ({ jurisdictions }) => {
  const classes = useStyles()
  const { openModal } = useModalActions()

  return (
    <div className={classes.root}>
      <div>Stats</div>
      <button onClick={() => openModal('map')}>map</button>
    </div>
  )
}

export default JurisdictionStats
