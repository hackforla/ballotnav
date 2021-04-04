import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DownIcon from '@material-ui/icons/ExpandMore'
import UpIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    left: 'calc(100% + 0.25em)',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
}))

const CollapseToggle = ({ onClick, isUncollapsed }) => {
  const classes = useStyles()
  return (
    <IconButton
      onClick={onClick}
      size='small'
      className={classes.button}
    >
      {isUncollapsed
        ? <UpIcon color='primary' className={classes.icon} />
        : <DownIcon color='primary' className={classes.icon} />
      }
    </IconButton>
  )
}

export default CollapseToggle
