import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    position: 'relative',
    cursor: 'pointer',
    height: '3.25rem',
    display: 'block',
    width: '3.25em',
    marginLeft: 'auto',
    '& span': {
      width: 30,
      height: 2,
      left: 0,
      backgroundColor: 'currentColor',
      display: 'block',
      position: 'absolute',
      transformOrigin: 'center',
      transitionDuration: '86ms',
      transitionProperty: 'background-color, opacity, transform',
      transitionTimingFunction: 'ease-out',
      '&:nth-child(1)': {
        top: 'calc(50% - 8px)',
      },
      '&:nth-child(2)': {
        top: 'calc(50% - 1px)',
      },
      '&:nth-child(3)': {
        top: 'calc(50% + 6px)',
      },
    },
  },
  isOpen: {
    zIndex: 10000,
    '& span:nth-child(1)': {
      transform: 'translateY(7px) rotate(45deg)',
    },
    '& span:nth-child(2)': {
      display: 'none',
    },
    '& span:nth-child(3)': {
      transform: 'translateY(-7px) rotate(-45deg)',
    },
  }
}))

const MenuButton = ({ menuOpen, onClick, onKeyDown }) => {
  const classes = useStyles()

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(classes.root, { [classes.isOpen]: menuOpen })}
      aria-label="menu"
      aria-expanded={menuOpen}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  )
}

export default MenuButton
