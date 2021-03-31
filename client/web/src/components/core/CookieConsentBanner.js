import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: '100%',
    left: 0,
    bottom: 0,
    opacity: 0.9,
    backdropFilter: 'blur(3px)',
  },
  content: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    borderRadius: 0,
    opacity: 1,
    fontSize: 14,
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  button: {
    borderRadius: 20,
    fontWeight: 700,
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}))

const CookieConsentBanner = ({ cookieName, cookieValue, expires }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (!Cookies.get(cookieName)) setOpen(true)
  }, [setOpen, cookieName])

  const handleAcceptCookies = () => {
    Cookies.set(cookieName, cookieValue, { expires })
    setOpen(false)
  }

  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      open={open}
      message="We use cookies and other tracking technologies to improve your
      browsing experience and to better understand our website traffic. By
      browsing our website, you consent to our use of cookies and other
      tracking technologies."
      action={
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleAcceptCookies}
          aria-label="accept"
        >
          OK
        </Button>
      }
      ContentProps={{
        className: classes.content,
      }}
    />
  )
}

export default CookieConsentBanner

CookieConsentBanner.propTypes = {
  cookieName: PropTypes.string,
  cookieValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  expires: PropTypes.number,
}

CookieConsentBanner.defaultProps = {
  cookieName: 'accept-cookies',
  cookieValue: true,
  expires: 30,
}
