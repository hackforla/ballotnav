import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  pageWidth: {
    width: theme.layout.pageWidth,
    maxWidth: 'calc(100vw - 8em)',
  },
}))

const PageWidth = ({ className, style, children }) => {
  const classes = useStyles()

  return (
    <div style={style} className={clsx(classes.pageWidth, className)}>
      { children }
    </div>
  )
}

export default PageWidth
