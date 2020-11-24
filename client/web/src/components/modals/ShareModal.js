import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { closeModal } from 'store/actions'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}))

const ShareModal = ({ isOpen, params, close }) => {
  const classes = useStyles()
  if (!isOpen) return null

  const { location } = params
  return (
    <Dialog classes={{ paper: classes.paper }} open={isOpen} onClose={close}>
      <IconButton
        size='small'
        className={classes.closeButton}
        aria-label='close'
        onClick={close}
      >
        <CloseIcon color='primary' fontSize="small" />
      </IconButton>
      Sharing { location.name }
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  isOpen: select.modals(state)['share'].isOpen,
  params: select.modals(state)['share'].params,
})

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal('share')),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal)
