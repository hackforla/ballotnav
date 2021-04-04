import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Editor = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Edit fields
    </div>
  )
}

export default Editor
