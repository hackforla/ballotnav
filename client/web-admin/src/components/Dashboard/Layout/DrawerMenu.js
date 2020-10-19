import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const VOLUNTEER_ITEMS = [
  {
    title: 'My Jurisdictions',
    path: '/jurisdictions',
  },
]

const ADMIN_ITEMS = [
  {
    title: 'Review Jurisdictions',
    path: '/review',
  },
  // {
  //   title: 'Edit States/Jurisdictions',
  //   path: '/states',
  // },
  {
    title: 'Assign Jurisdictions',
    path: '/assign'
  },
]

function Menu() {
  const history = useHistory()
  const location = useLocation()
  const { user, logout } = useAuth()
  return (
    <>
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${user.firstName} ${user.role === 'admin' ? '(Admin)' : '(Volunteer)'}`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user.role === 'volunteer' && VOLUNTEER_ITEMS.map(({ title, path }, index) => {
          const active = location.pathname === path
          return (
            <ListItem
              key={path}
              selected={active}
              button
              onClick={() => history.push(path)}
            >
              <ListItemText primary={title} />
            </ListItem>
          )
        })}
        {user.role === 'admin' && ADMIN_ITEMS.map(({ title, path }, index) => {
          const active = location.pathname === path
          return (
            <ListItem
              key={path}
              selected={active}
              button
              onClick={() => history.push(path)}
            >
              <ListItemText primary={title} />
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </>
  )
}

export default Menu
