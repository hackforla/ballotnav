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
  },
  tab: {
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 600,
    backgroundColor: theme.palette.common.white,
    borderTopLeftRadius: '0.75em',
    borderTopRightRadius: '0.75em',
    padding: '0.125em 0.5em',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    marginRight: 2,
    whiteSpace: 'nowrap',
    '& > a': {
      color: 'inherit',
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
        jurisdictionId: jurisdiction.id,
        jurisdictionName: jurisdiction.name,
      }
    }).filter((juris) => !!juris)
  }, [jurisdictionTabs, jurisdictions])

  const closeTab = useCallback((jid, isSelected) => {
    dispatch(closeJurisdictionTab(jid))
    if (isSelected) history.push('/')
  }, [dispatch, history])

  return tabs.map((tab, index) => {
    const isSelected = tab.jurisdictionId === selectedJid
    return (
      <div
        key={tab.jurisdictionId}
        className={clsx(classes.tab, { [classes.selected]: isSelected })}
      >
        <Link to={`/jurisdiction/${tab.jurisdictionId}`}>
          { tab.jurisdictionName }
        </Link>
        <CloseIcon
          className={classes.closeButton}
          onClick={closeTab.bind(null, tab.jurisdictionId, isSelected)}
        />
      </div>
    )
  })
}

export default JurisdictionTabs
