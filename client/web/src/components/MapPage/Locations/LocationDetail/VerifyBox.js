import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as NewWindowIcon } from 'assets/icons/new-window.svg'
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: 14,
    borderRadius: 10,
  },
  title: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 8,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'inline-block',
    margin: '0 18px 0 6px',
    textDecoration: 'underline',
  },
  phone: {
    display: 'inline-block',
    marginLeft: 6,
  },
}))

const VerifyBox = ({ location, jurisdiction }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.title}>To Verify</div>
      <div className={classes.info}>
        <NewWindowIcon />
        <span className={classes.link}>fayeettetn.us</span>
        <PhoneIcon />
        <span className={classes.phone}>(123) 455-3467</span>
      </div>
    </div>
  )
}

export default VerifyBox
