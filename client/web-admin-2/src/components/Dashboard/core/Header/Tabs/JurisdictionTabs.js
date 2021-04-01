import React, { useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { useJurisdictionTabs, useMyJurisdictions } from 'store/selectors'
import {
  openJurisdictionTab,
  closeJurisdictionTab,
} from 'store/actions/volunteer'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    userSelect: 'none',
    minWidth: 0,
  },
  tab: {
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 700,
    backgroundColor: theme.palette.common.white,
    borderTopLeftRadius: '0.75em',
    borderTopRightRadius: '0.75em',
    padding: '0.125em 0.5em',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    marginRight: 2,
    minWidth: 0,
    '& > a': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: 'inherit',
      minWidth: 0,
    }
  },
  closeButton: {
    marginLeft: '1em',
    cursor: 'pointer',
    fontSize: '1.25em',
  },
  selected: {
    opacity: 1,
    '& > a': {
      cursor: 'default',
    },
  },
}))

const JurisdictionTabs = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const jurisdictions = useMyJurisdictions()
  const jurisdictionTabs = useJurisdictionTabs()
  const match = useRouteMatch('/jurisdiction/:jid')
  const selectedJid = +match?.params.jid

  useEffect(() => {
    if (!jurisdictions) return

    // handle case where jurisdiction is not assigned to user
    if (!jurisdictions.find((j) => j.id === selectedJid))
      return history.push('/')

    // open the tab if it's not open already
    if (!jurisdictionTabs.includes(selectedJid))
      dispatch(openJurisdictionTab(selectedJid))
  }, [dispatch, history, selectedJid, jurisdictions, jurisdictionTabs])

  const tabs = useMemo(() => {
    if (!jurisdictions) return []

    return jurisdictionTabs.map((jid) => {
      const jurisdiction = jurisdictions.find((juris) => juris.id === jid)
      if (!jurisdiction) return null
      return {
        jid: jurisdiction.id,
        title: jurisdiction.name,
      }
    }).filter((juris) => !!juris)
  }, [jurisdictionTabs, jurisdictions])

  const closeTab = useCallback((jid, isSelected) => {
    dispatch(closeJurisdictionTab(jid))
    if (isSelected) history.push('/')
  }, [dispatch, history])

  return (
    <div className={classes.root}>
      {tabs.map((tab) => {
        const isSelected = tab.jid === selectedJid
        const clx = clsx(classes.tab, { [classes.selected]: isSelected })
        const close = closeTab.bind(null, tab.jid, isSelected)

        return (
          <div key={tab.jid} className={clx}>
            <Link to={`/jurisdiction/${tab.jid}`}>{ tab.title }</Link>
            <CloseIcon className={classes.closeButton} onClick={close} />
          </div>
        )
      })}
    </div>
  )
}

export default JurisdictionTabs
