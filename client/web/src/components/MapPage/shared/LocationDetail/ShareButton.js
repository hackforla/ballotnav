import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg'
import { openModal } from 'store/actions'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  share: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  shareIcon: {
    marginRight: 6,
  },
  shareText: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 400,
  },
}))

const ShareButton = ({ openShareModal, location }) => {
  const classes = useStyles()
  return (
    <div className={classes.share} onClick={() => openShareModal({ location })}>
      <ShareIcon className={classes.shareIcon} />
      <span className={classes.shareText}>Share location</span>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openShareModal: (params) => dispatch(openModal('share', params)),
})

export default connect(null, mapDispatchToProps)(ShareButton)
