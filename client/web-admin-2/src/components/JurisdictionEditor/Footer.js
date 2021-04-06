import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import useVolunteerActions from 'store/actions/volunteer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: '#EBF3FA',
  },
}))

const Footer = ({ wipJurisdiction }) => {
  const classes = useStyles()
  const { releaseWipJurisdiction } = useVolunteerActions()

  return (
    <div className={classes.root}>
      <Button
        color='primary'
        variant='contained'
        onClick={releaseWipJurisdiction.bind(null, wipJurisdiction)}
        disabled={wipJurisdiction.isReleased}
        style={{
          fontWeight: 700,
          fontSize: 12,
          borderRadius: '2em',
          padding: '1em 3em'
        }}
      >
        Submit For Review
      </Button>
    </div>
  )
}

export default Footer
