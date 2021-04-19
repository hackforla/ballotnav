import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useModal } from 'store/selectors'
import useModalActions from 'store/actions/modals'
import Map2 from 'components/admin/AdminDashboard/Map2'

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
  const { isOpen } = useModal('map2')

  const close = () => closeModal('map2')

  return (
    <Dialog fullScreen open={isOpen}>
      <div className={classes.close}>
        <IconButton onClick={close}>
          <CloseIcon style={{ color: '#FFF', fontSize: 32 }} />
        </IconButton>
      </div>
      <Map2 />
    </Dialog>
  )
}

export default MapModal
