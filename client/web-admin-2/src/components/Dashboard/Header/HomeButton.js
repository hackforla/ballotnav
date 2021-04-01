import React from 'react'
import { Link } from 'react-router-dom'
import ballotnavLogo from 'assets/logos/ballotnav.svg'

const HomeButton = ({ closeMenu }) => (
  <Link to="/">
    <img
      src={ballotnavLogo}
      alt="Ballotnav logo"
      style={{
        height: 30,
        display: 'block',
      }}
      onClick={closeMenu}
    />
  </Link>
)

export default HomeButton
