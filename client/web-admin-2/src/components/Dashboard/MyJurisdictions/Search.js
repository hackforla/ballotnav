import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'

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

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter by jurisdiction or state name"
      />
      <IconButton size='small'>
        <SearchIcon color='primary' style={{ fontSize: 28 }} />
      </IconButton>
    </div>
  )
}

export default Search
