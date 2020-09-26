import React from 'react'
import { Link } from 'react-router-dom'

function Header({ user, logout }) {
  return (
    <div style={{ height: 100, backgroundColor: 'red'}}>
      <button onClick={logout}>logout</button>
      <Link to='/admin'>admin</Link>
    </div>
  )
}

export default Header
