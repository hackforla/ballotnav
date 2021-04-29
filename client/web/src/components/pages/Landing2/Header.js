import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    outline: '3px blue solid',
    height: 100,
  },
}))

const Header = () => {
  const classes = useStyles()

  return <div className={classes.root}>Header</div>
}

export default Header
