import React, { useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as select from 'store/selectors'
import { closeModal } from 'store/actions'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}))

const ShareModal = ({ isOpen, close }) => {
  const classes = useStyles()
  const { pathname, search } = useLocation()

  const shareLink = useMemo(() => {
    const { origin } = window.location
    const { jid, lid } = queryString.parse(search)
    if (!jid || !lid) return null
    const query = queryString.stringify({ jid, lid })
    return `${origin}${pathname}?${query}`
  }, [pathname, search])

  const facebookLink = useMemo(() => {
    const link = encodeURIComponent(shareLink)
    return `https://www.facebook.com/sharer/sharer.php?u=${link}%2F&amp;src=sdkpreparse`
  }, [shareLink])

  const twitterLink = useMemo(() => {
    const link = encodeURIComponent(shareLink)
    return `https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&url=${link}`
  }, [shareLink])

  const copyLink = useCallback(async () => {
    if (shareLink)
      try {
        navigator.clipboard.writeText(shareLink)
        setShareResult('success')
      } catch (e) {
        setShareResult('error')
      }
  }, [shareLink])

  if (!isOpen) return null
  return (
    <Dialog classes={{ paper: classes.paper }} open={isOpen} onClose={close}>
      <IconButton
        size="small"
        className={classes.closeButton}
        aria-label="close"
        onClick={close}
      >
        <CloseIcon color="primary" fontSize="small" />
      </IconButton>
      <a target="_blank" rel="noreferrer" href={facebookLink}>
        Share on facebook
      </a>
      <a target="_blank" rel="noreferrer" href={twitterLink}>
        Share on twitter
      </a>
      <button onClick={copyLink}>copy link</button>
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
