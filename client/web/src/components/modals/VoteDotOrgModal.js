import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '40px 30px',
    width: 700,
    height: 'calc(100vh - 64px)',
  },
  paperMobile: {
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
}))

const VoteDotOrg = ({ isOpen, params, close }) => {
  const { isMobile } = useBreakpoints()
  const classes = useStyles({ isMobile })
  const { type } = params
  return (
    <Dialog
      keepMounted // because vote.org takes a while to load in the iframe
      classes={{ paper: isMobile ? classes.paperMobile : classes.paper }}
      fullScreen={isMobile}
      open={isOpen}
      onClose={close}
    >
      <IconButton
        size="small"
        className={classes.closeButton}
        aria-label="close"
        onClick={close}
      >
        <CloseIcon color="primary" />
      </IconButton>
      {['verify', 'register', 'absentee'].map((domain, index) => (
        <iframe
          title={domain}
          key={domain}
          src={`https://${domain}.vote.org/?partner=111111&campaign=free-tools`}
          width={type === domain ? '100%' : 0}
          height={type === domain ? '100%' : 0}
          marginHeight="0"
          frameBorder="0"
          id={`frame${index}`}
          scrollable="no"
        />
      ))}
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  isOpen: select.modals(state)['voteDotOrg'].isOpen,
  params: select.modals(state)['voteDotOrg'].params,
})

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal('voteDotOrg')),
})

export default connect(mapStateToProps, mapDispatchToProps)(VoteDotOrg)
