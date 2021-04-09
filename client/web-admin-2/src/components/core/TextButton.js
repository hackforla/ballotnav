import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  common: {
    textTransform: 'none',
    fontWeight: 700,
  },
  small: {
    fontSize: 12,
    borderRadius: '1.25em',
    padding: '0.25em 1em',
  },
  medium: {
    fontSize: 12,
    borderRadius: '1.5em',
    padding: '0.25em 3em',
  },
  large: {
    fontSize: 14,
    borderRadius: '1.5em',
    padding: '0.75em 3em',
  },
  xLarge: {
    fontSize: 14,
    borderRadius: '2em',
    padding: '1em 3em',
    textTransform: 'uppercase',
  },
}))

const TextButton = ({
  label = 'add a label prop',
  size = 'medium',
  className,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <Button
      color="primary"
      variant="contained"
      className={clsx(classes.common, classes[size], className)}
      {...rest}
    >
      {label}
    </Button>
  )
}

export default TextButton
