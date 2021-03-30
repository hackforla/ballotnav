import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    '& a': {
      color: 'inherit',
    },
  },
}))

const Copyright = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      &#169; COPYRIGHT 2020 BallotNav |{' '}
      <Link to="/privacy-policy">PRIVACY POLICY</Link>
    </div>
  )
}

export default Copyright
