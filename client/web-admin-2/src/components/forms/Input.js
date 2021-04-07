import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .changed:after': {
      content: '"*"',
      position: 'absolute',
      top: 0,
      right: -10,
      color: theme.palette.primary.main,
    },
    '& .MuiInputLabel-shrink': {
      fontWeight: 600,
      color: '#808080',
    },
  },
}))

const Input = ({ select, options, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TextField select={select} {...rest}>
        {select &&
          options.map((opt) => (
            <MenuItem dense key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </TextField>
    </div>
  )
}

export default Input
