import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'

function Header() {
  const { user, logout, login } = useAuth()
  return (
    <div style={{ height: 100, backgroundColor: 'red'}}>
      <button onClick={logout}>logout</button>
      {user.role === 'admin' && (
        <Link to='/admin'>admin</Link>
      )}
    </div>
  )
}

export default Header
