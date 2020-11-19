import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5px 15px',
    backgroundColor: '#EA082D',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fill: '#FFFFFF',
    }
  },
}))

const VerifyAlert = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    // let the map know to resize
    window.dispatchEvent(new Event('resize'))
    setOpen(false)
  }

  if (!open) return null
  return (
    <div className={classes.root}>
      <Typography variant='body2'>
        Remember to verify the information through the
        official website and phone number before you leave.
      </Typography>
      <IconButton
        aria-label='close'
        onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </div>
  )
}

export default VerifyAlert
