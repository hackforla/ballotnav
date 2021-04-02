import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0.25em 0',
    borderBottom: '1px #d6d6d6 solid',
    marginBottom: '0.5em',
  },
  input: {
    flex: 1,
    color: theme.palette.primary.main,
    fontSize: '1em',
    border: 'none',
    outline: 'none',
  }
}))

const Search = ({ value, onChange }) => {
  const classes = useStyles()

  const handleChange = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        value={value}
        onChange={handleChange}
        placeholder="Filter by jurisdiction or state name"
      />
      <SearchIcon color='primary' style={{ fontSize: 28 }} />
    </div>
  )
}

export default Search
