import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    textTransform: 'none',
    borderRadius: '2em',
    padding: ({ padding }) => padding,
    fontWeight: 700,
    fontSize: 12,
  },
}))

const FormButtons = ({
  onReset,
  onSubmit,
  resetDisabled,
  submitDisabled,
  submitTitle,
  padding }) => {
  const classes = useStyles({ padding })

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        disabled={resetDisabled}
        onClick={onReset}
      >
        Clear changes
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={submitDisabled}
        onClick={onSubmit}
      >
        { submitTitle }
      </Button>
    </div>
  )
}

export default FormButtons
