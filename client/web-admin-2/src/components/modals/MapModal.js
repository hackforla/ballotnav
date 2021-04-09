import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useModal } from 'store/selectors'
import useModalActions from 'store/actions/modals'
import Map from 'components/admin/AdminDashboard/Map'

const useStyles = makeStyles((theme) => ({
  root: {},
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100000,
  },
}))

const MapModal = () => {
  const classes = useStyles()
  const { closeModal } = useModalActions()
  const { isOpen } = useModal('map')

  const close = () => closeModal('map')

  return (
    <Dialog fullScreen keepMounted open={isOpen}>
      <div className={classes.close}>
        <IconButton onClick={close}>
          <CloseIcon style={{ color: '#FFF', fontSize: 32 }} />
        </IconButton>
      </div>
      <Map />
    </Dialog>
  )
}

export default MapModal
