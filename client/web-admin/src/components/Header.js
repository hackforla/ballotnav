import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
}

const useStyles = makeStyles({
  headerHolder: {
    backgroundColor: (props) => props.headerColor,
    marginBottom: (props) => props.headerMargin,
    boxShadow: (props) => props.headerShadow,
  },
  header: {
    minHeight: '60px',
    padding: '0 1.5em 0 0',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '3.5rem',
    height: '2.5rem',
    margin: '.5rem .75rem',

    '&:hover': {
      filter: 'brightness(1.2)',
    },
  },
  tagline: {
    color: '#1b1b1b',
    fontStyle: 'italic',
    paddingLeft: '9px',
    lineHeight: '1.5',
    fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
})

export default function Header(props) {
  const { user, setUser, setToast } = props
  const defaultStyles = {
    headerColor: '#FFF',
    headerMargin: '0',
  }

  const classes = useStyles(defaultStyles)

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <div className={classes.content}></div>
          <Menu user={user} setUser={setUser} setToast={setToast} />
        </Toolbar>
      </AppBar>
    </>
  )
}
