import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  common: {
    textTransform: 'none',
    fontWeight: 700,
    position: 'relative',
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
  label: {
    visibility: ({ isLoading }) => (isLoading ? 'hidden' : 'visible'),
    cursor: 'pointer',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}))

const TextButton = ({
  label = 'add a label prop',
  size = 'medium',
  disabled,
  isLoading,
  className,
  ...rest
}) => {
  const classes = useStyles({ isLoading })

  return (
    <Button
      color="primary"
      variant="contained"
      className={clsx(classes.common, classes[size], className)}
      disabled={disabled || isLoading}
      {...rest}
    >
      <label className={classes.label}>{label}</label>
      {isLoading && (
        <div className={classes.loader}>
          <CircularProgress color="primary" size="1.5em" />
        </div>
      )}
    </Button>
  )
}

export default TextButton
