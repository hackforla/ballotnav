import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from 'components/core/Checkbox'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 25,
    right: 10,
    pointerEvents: 'all',
    userSelect: 'none',
    backgroundColor: '#27272b',
    color: theme.palette.common.white,
    padding: '0.5em 0.75em',
    borderRadius: '0.5em',
    fontSize: '1.5em',
  },
  checkbox: {
    padding: '0.25em 0'
  },
}))

const Layers = ({ layers, setLayers }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {Object.keys(layers).map((layer) => (
        <div key={layer} className={classes.checkbox}>
          <Checkbox
            checked={layers[layer]}
            onChange={() => {
              setLayers({
                ...layers,
                [layer]: !layers[layer],
              })
            }}
            label={layer}
          />
        </div>
      ))}
    </div>
  )
}

export default Layers
