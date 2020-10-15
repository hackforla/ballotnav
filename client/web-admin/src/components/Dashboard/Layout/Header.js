import React from 'react'

function Header({ title, children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        paddingLeft: 25,
        paddingRight: 25,
        top: 0,
        left: 0,
        right: 240,
        backgroundColor: '#3f51b5',
        zIndex: 1000,
        height: 75,
      }}>
      <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{ title }</div>
      <div>
        { children }
      </div>
    </div>
  )
}

export default Header
