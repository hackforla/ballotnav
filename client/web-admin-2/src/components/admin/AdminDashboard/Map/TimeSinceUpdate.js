import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ColoredCheckbox from 'components/core/ColoredCheckbox'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 150,
    right: 10,
    backgroundColor: '#27272b',
    borderRadius: '0.5em',
    fontSize: '1.5em',
    padding: '0.5em 1em',
    color: theme.palette.common.white,
  },
  checkbox: {
    margin: '0.25em 0',
  },
}))

const TimeSinceUpdate = ({ updateLayer, setUpdateLayer }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {updateLayer.map((period) => (
        <div key={period.id} className={classes.checkbox}>
          <ColoredCheckbox
            checked={period.visible}
            label={period.label}
            onChange={() => {
              const newUpdateLayer = updateLayer.map((p) => {
                if (period.id !== p.id) return p
                else return {
                  ...p,
                  visible: !p.visible
                }
              })
              setUpdateLayer(newUpdateLayer)
            }}
            color={period.color}
          />
        </div>
      ))}
    </div>
  )
}

export default TimeSinceUpdate
