import React from 'react'
import SearchBar from 'components/shared/SearchBar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
  },
}))

const Search = ({ close }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SearchBar onComplete={close} />
    </div>
  )
}

export default Search
