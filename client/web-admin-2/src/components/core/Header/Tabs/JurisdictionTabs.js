import React, { useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { useJurisdictionTabs, useWips } from 'store/selectors'
import useWipActions from 'store/actions/wip'
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
    },
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
  const history = useHistory()
  const jurisdictions = useWips()
  const jurisdictionTabs = useJurisdictionTabs()
  const { openTab, closeTab } = useWipActions()
  const match = useRouteMatch('/jurisdictions/:jid')
  const selectedJid = +match?.params.jid

  useEffect(() => {
    if (selectedJid && !jurisdictionTabs.includes(selectedJid))
      openTab(selectedJid)
  }, [openTab, selectedJid, jurisdictionTabs])

  const tabs = useMemo(() => {
    if (!jurisdictions) return []

    return jurisdictionTabs
      .map((jid) => {
        const jurisdiction = jurisdictions[jid]
        if (!jurisdiction) return null
        return {
          jid,
          title: jurisdiction.name,
        }
      })
      .filter((juris) => !!juris)
  }, [jurisdictionTabs, jurisdictions])

  const onCloseTab = useCallback(
    (jid, isSelected) => {
      closeTab(jid)
      if (isSelected) history.push('/jurisdictions')
    },
    [closeTab, history]
  )

  return (
    <div className={classes.root}>
      {tabs.map((tab) => {
        const isSelected = tab.jid === selectedJid
        const clx = clsx(classes.tab, { [classes.selected]: isSelected })
        const close = onCloseTab.bind(null, tab.jid, isSelected)

        return (
          <div key={tab.jid} className={clx}>
            <Link to={`/jurisdictions/${tab.jid}`}>{tab.title}</Link>
            <CloseIcon className={classes.closeButton} onClick={close} />
          </div>
        )
      })}
    </div>
  )
}

export default JurisdictionTabs
