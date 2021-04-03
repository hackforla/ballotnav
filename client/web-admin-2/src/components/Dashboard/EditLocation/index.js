import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3em',
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  backButton: {
    color: theme.palette.link.main,
    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}))

const EditLocation = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.title}>Edit location</h2>
      </div>
      <div
        className={classes.backButton}
        onClick={history.goBack}
      >
        Back to the jurisdiction
      </div>
    </div>
  )
}

export default EditLocation
