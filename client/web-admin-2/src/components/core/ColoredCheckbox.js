import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  label: {
    fontSize: '1em',
    marginLeft: '0.5em',
  },
  svg: {
    height: '1.2em',
    width: '1.2em',
  },
  outer: {
    stroke: theme.palette.common.white,
    strokeWidth: 2,
    fill: ({ checked, color }) => checked ? color : 'transparent',
  },
  // inner: {
  //   fill: theme.palette.common.white,
  //   display: ({ checked }) => (checked ? 'block' : 'none'),
  // },
}))

export const Checkbox = ({ checked, onChange, label, color }) => {
  const classes = useStyles({ checked, color })

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      onChange(!checked)
    },
    [checked, onChange]
  )

  return (
    <div className={classes.root} onClick={handleClick}>
      <svg viewBox="0 0 24 24" className={classes.svg}>
        <circle r={10} cx={12} cy={12} className={classes.outer} />
        {/*<circle r={4} cx={12} cy={12} className={classes.inner} />*/}
      </svg>
      {label && <div className={classes.label}>{label}</div>}
    </div>
  )
}

export default Checkbox
