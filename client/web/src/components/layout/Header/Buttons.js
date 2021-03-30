import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { openModal } from 'store/actions/modals'
import IconButton from '@material-ui/core/IconButton'
import ballotnavLogo from 'assets/logos/ballotnav.svg'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

export const HomeButton = ({ closeMenu }) => (
  <Link to="/">
    <img
      src={ballotnavLogo}
      alt="Ballotnav logo"
      style={{
        height: 30,
        display: 'block'
      }}
      onClick={closeMenu}
    />
  </Link>
)

export const MenuButton = ({ isMenuOpen, openMenu, closeMenu }) => (
  <IconButton
    size="small"
    aria-label="toggle menu"
    onClick={isMenuOpen ? closeMenu : openMenu}
  >
    {isMenuOpen ? (
      <CloseIcon color='primary' style={{ fontSize: 32 }} />
    ) : (
      <MenuIcon color='primary' style={{ fontSize: 32 }} />
    )}
  </IconButton>
)

export const SearchButton = connect(null, (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
}))(({ isMenuOpen, openMenu, closeMenu, openSearchModal }) => (
  <IconButton
    size="small"
    aria-label="search"
    onClick={openSearchModal}
  >
    <SearchIcon color='primary' style={{ fontSize: 32 }} />
  </IconButton>
))
