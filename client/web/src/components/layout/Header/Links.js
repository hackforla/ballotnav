import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  links: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 18,
    '& a': {
      color: 'inherit',
      '&:not(:first-child)': {
        marginLeft: 30,
      },
    }
  }
}))

const DesktopLinks = ({ closeMenu }) => {
  const classes = useStyles()
  return (
    <div className={classes.links}>
      <Link to="/about" onClick={closeMenu}>About</Link>
      <Link to="/volunteer" onClick={closeMenu}>Volunteer</Link>
    </div>
  )
}


export default DesktopLinks
