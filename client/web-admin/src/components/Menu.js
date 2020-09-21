import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItemLink from './MenuItemLink'
import { logout } from './auth/Logout'

Menu.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuButton: {
    transform: 'scale(1.6,1.5)',
    backgroundColor: '#FFF',
    padding: '0.5rem',
    minWidth: '0',
    '&:hover': {
      backgroundColor: '#FFF',
    },
  },
  blueMenu: {
    fill: '#19334D',
  },
})

export default function Menu(props) {
  const defaultStyles = {
    headerColor: '#FFF',
  }
  const classes = useStyles(defaultStyles)
  const { user, setUser, setToast } = props
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setIsOpen(!isOpen)
  }

  const unAuthLinks = (
    <>
      <Divider />
      <MenuItemLink key="login" to="/login" text="Volunteer Login">
        Login
      </MenuItemLink>
    </>
  )

  const authedLinks = (
    <>
      <Divider />
      <MenuItemLink
        to="#"
        key="logout"
        text="Logout"
        onClick={() => logout(setUser, setToast, history)}
      >
        Logout
      </MenuItemLink>
    </>
  )

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
    >
      <List>
        {user && (
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.firstName} />
            </ListItem>
            <Divider />
          </>
        )}

        {user ? authedLinks : unAuthLinks}
      </List>
      {/* <LanguageChooser /> */}
    </div>
  )

  return (
    <div>
      <Button className={classes.menuButton} onClick={toggleDrawer}>
        <MenuIcon className={classes.blueMenu} />
      </Button>

      <Drawer anchor={'right'} open={isOpen} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  )
}
