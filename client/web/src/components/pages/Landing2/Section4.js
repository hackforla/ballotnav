import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    outline: '3px green solid',
    height: 150,
    marginTop: '2em',
  },
}))

const Section4 = () => {
  const classes = useStyles()

  return <div className={classes.root}>Section4</div>
}

export default Section4
