import React, { useMemo, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as select from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg'
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg'
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
  },
}))

const ShareModal = ({ isOpen, close }) => {
  const classes = useStyles()
  const { pathname, search } = useLocation()
  const [copyResult, setCopyResult] = useState(undefined)

  const shareLink = useMemo(() => {
    const { origin } = window.location
    const { jid, lid } = queryString.parse(search)
    if (!jid || !lid) return null
    const query = queryString.stringify({ jid, lid })
    return `${origin}${pathname}?${query}`
  }, [pathname, search])

  const emailLink = useCallback(() => {
    const link = encodeURIComponent(shareLink)
    window.open(`mailto:?body=${link}`, '_blank')
  }, [shareLink])

  const facebookShare = useCallback(() => {
    const redirect = encodeURIComponent(shareLink)
    const share = `https://www.facebook.com/sharer/sharer.php?u=${redirect}%2F&amp;src=sdkpreparse`
    window.open(share, '_blank')
  }, [shareLink])

  const twitterShare = useCallback(() => {
    const redirect = encodeURIComponent(shareLink)
    const share = `https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&url=${redirect}`
    window.open(share, '_blank')
  }, [shareLink])

  const copyLink = useCallback(async () => {
    if (shareLink)
      try {
        navigator.clipboard.writeText(shareLink)
        setCopyResult('Link copied')
      } catch (e) {
        setCopyResult('Could not copy')
      }
  }, [shareLink])

  return (
    <Dialog classes={{ paper: classes.paper }} open={isOpen} onClose={close}>
      <div className={classes.header}>
        <div className={classes.title}>Share location</div>
        <IconButton size="small" aria-label="close" onClick={close}>
          <CloseIcon color="primary" />
        </IconButton>
      </div>
      <List>
        <ListItem button onClick={emailLink}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Send link with location via email" />
        </ListItem>
        <ListItem button onClick={facebookShare}>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="Share location on facebook" />
        </ListItem>
        <ListItem button onClick={twitterShare}>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Share location on twitter" />
        </ListItem>
        <ListItem button onClick={copyLink}>
          <ListItemIcon>
            <CopyIcon />
          </ListItemIcon>
          <ListItemText primary="Copy link" />
          <span>{copyResult}</span>
        </ListItem>
      </List>
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
