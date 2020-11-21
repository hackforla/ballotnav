import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from './Accordion'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0',
  },
}))

const CheckSteps = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Accordion title="Check your steps">
        <div>To</div>
        <div>Do</div>
      </Accordion>
    </div>
  )
}

export default CheckSteps
