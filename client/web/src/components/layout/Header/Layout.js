import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Menu from './Menu'

const PADDING = 10

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.layout.headerHeight,
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    position: 'relative',
    margin: '0 auto',
  },
  left: {
    position: 'absolute',
    top: '50%',
    left: PADDING,
    transform: 'translateY(-50%)'
  },
  right: {
    position: 'absolute',
    top: '50%',
    right: PADDING,
    transform: 'translateY(-50%)',
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const Layout = ({ Left, Right, Center }) => {
  const classes = useStyles()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  return (
    <>
      <div className={classes.root}>
        {Left && (
          <div className={classes.left}>
            <Left
              isMenuOpen={isMenuOpen}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          </div>
        )}
        {Center && (
          <div className={classes.center}>
            <Center
              isMenuOpen={isMenuOpen}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          </div>
        )}
        {Right && (
          <div className={classes.right}>
            <Right
              isMenuOpen={isMenuOpen}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          </div>
        )}
      </div>
      {isMenuOpen && (
        <Menu
          isMenuOpen={isMenuOpen}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
      )}
    </>
  )
}

export default Layout
