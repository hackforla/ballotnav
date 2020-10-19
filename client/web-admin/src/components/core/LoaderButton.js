import React from 'react'
import { withStyles, Button, CircularProgress } from '@material-ui/core'

const styles = {
  root: {
    marginLeft: 5
  }
}

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
    style={{
      position: 'absolute',
      top: 'calc(50% - 10px)',
      left: 'calc(50% - 10px)',
    }}
  />
))

const LoaderButton = (props) => {
  const {
    children,
    loading,
    style,
    ...rest
  } = props
  return (
    <Button disabled={loading} {...rest} style={{ ...style, position: 'relative' }}>
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>{ children }</div>
      {loading && <SpinnerAdornment {...rest} /> }
    </Button>
  )
}

export default LoaderButton
