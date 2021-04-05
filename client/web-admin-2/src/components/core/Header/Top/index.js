import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import bnLogo from 'assets/logos/ballotnav.svg'
import UserRight from './UserRight'
import AuthRight from './AuthRight'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1em 0',
  },
  logo: {
    height: 30,
    display: 'block',
  },
}))

const HeaderTop = ({ isAuth }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={bnLogo} alt="Ballotnav logo" className={classes.logo} />
      </Link>
      {isAuth ? <AuthRight /> : <UserRight />}
    </div>
  )
}

export default HeaderTop
