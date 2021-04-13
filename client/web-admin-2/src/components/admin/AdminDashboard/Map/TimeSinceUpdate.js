import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ColoredCheckbox from 'components/core/ColoredCheckbox'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 220,
    backgroundColor: '#27272b',
    borderRadius: '0.5em',
    fontSize: '1.25em',
    padding: '0.5em 1em',
    color: theme.palette.common.white,
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    marginBottom: '0.5em',
  },
  checkbox: {
    margin: '0.25em 0',
  },
}))

const TimeSinceUpdate = ({ updateLayer, setUpdateLayer }) => {
  const classes = useStyles()

  const togglePeriod = useCallback((period) => {
    setUpdateLayer((updateLayer) => updateLayer.map((p) => (
      p.id === period.id
        ? { ...p, visible: !p.visible }
        : p
    )))
  }, [setUpdateLayer])

  return (
    <div className={classes.root}>
      <div className={classes.title}>time since update</div>
      {updateLayer.map((period) => (
        <div key={period.id} className={classes.checkbox}>
          <ColoredCheckbox
            checked={period.visible}
            label={period.label}
            onChange={togglePeriod.bind(null, period)}
            color={period.color}
          />
        </div>
      ))}
    </div>
  )
}

export default TimeSinceUpdate
