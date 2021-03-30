import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import useBreakpoints from 'hooks/useBreakpoints'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px 5px 5px 15px',
    backgroundColor: '#EA082D',
    color: '#FFFFFF',
    display: 'flex',
    fontWeight: 400,
    fontSize: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fill: '#FFFFFF',
    },
  },
  mobile: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
    zIndex: 3,
  },
}))

const VerifyAlert = () => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    // let the map know to resize
    window.dispatchEvent(new Event('resize'))
    setOpen(false)
  }

  if (!open) return null
  return (
    <div className={clsx(classes.root, { [classes.mobile]: isMobile })}>
      <Typography variant="body2">
        Remember to verify the information through the official phone number or
        website before you leave.
      </Typography>
      <IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default VerifyAlert
