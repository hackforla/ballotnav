import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import { Button, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core'

function ListItemLink({ to, text, onClick }) {
  let location = useLocation()
  const active = location.pathname === to

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} innerRef={ref} {...itemProps} />
      )),
    [to]
  )

  return (
    <ListItem selected={active} button component={renderLink} onClick={onClick}>
      <ListItemText primary={text} />
    </ListItem>
  )
}

function Header() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const list = () => (
    <div
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        <ListItemLink to='/jurisdictions' text='My Jurisdictions' />
        <ListItemLink to='/states' text='Edit States' />
        <ListItemLink to='/jurisdictions/search' text='Edit Jurisdictions' />
        <Divider />
        <Button onClick={logout}>Logout</Button>
      </List>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        padding: 20,
        alignItems: 'center',
        borderBottom: '1px black solid',
      }}
    >
      <div style={{ flex: 1 }}>
      </div>
      <div style={{ marginRight: 40 }}>Hi {user.firstName} ❤️ 🙏</div>
      <Button disableElevation variant="contained" onClick={logout}>
        logout
      </Button>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default Header
