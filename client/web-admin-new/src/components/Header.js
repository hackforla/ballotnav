import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import { Button } from '@material-ui/core'

function Header() {
  const { user, logout } = useAuth()
  return (
    <div style={{ display: 'flex', padding: 20, alignItems: 'center', borderBottom: '1px black solid' }}>
      <div style={{ flex: 1 }}>
        {user.role === 'admin' && (
          <Link to='/admin'>admin</Link>
        )}
      </div>
      <Button disableElevation variant='contained' onClick={logout}>logout</Button>
    </div>
  )
}

export default Header
