import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  inputRoot: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid #FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    fontWeight: 700,
    marginBottom: '5px',
    marginLeft: '6px',
  },
  clearIndicator: {
    color: '#FFFFFF',
  },
  clearIndicatorDirty: {
    color: '#FFFFFF',
  },
  popupIndicator: {
    color: '#FFFFFF',
  },
  listbox: {
    paddingTop: 0,
    paddingBottom: 0,
    '&::-webkit-scrollbar': {
      width: '10px',
      backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#5c6194',
      borderRadius: '10px',
      '&:hover': {
        backgroundColor: '#393E6C',
      },
    },
  },
  option: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#393E6C',
    },
    '&:not(:hover)': {
      backgroundColor: theme.palette.primary.main,
    },
    '&[aria-selected="true"]': {
      backgroundColor: '#393E6C',
    },
  },
}))

const useStylesMobile = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  inputRoot: {
    backgroundColor: theme.palette.primary.main,
    border: '1px solid #FFFFFF',
    color: '#FFFFFF',
  },
  input: {
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
    color: '#FFFFFF',
  },
  popupIndicator: {
    color: '#FFFFFF',
  },
  listbox: {
    paddingTop: 0,
    paddingBottom: 0,
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#5c6194',
      borderRadius: '6px',
      '&:hover': {
        backgroundColor: '#393E6C',
      },
    },
  },
  option: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#393E6C',
    },
    '&:not(:hover)': {
      backgroundColor: theme.palette.primary.main,
    },
    '&[aria-selected="true"]': {
      backgroundColor: '#393E6C',
    },
  },
}))

const SearchSelect = ({
  options,
  selected,
  onChange,
  disabled,
  placeholderText,
  width,
  outline,
  getOptionLabel,
  disableClearable,
  isMobile,
}) => {
  const classes = useStyles()
  const classesMobile = useStylesMobile()

  return (
    <Autocomplete
      // debug
      classes={isMobile ? classesMobile : classes}
      autoComplete
      clearOnEscape
      disableListWrap
      handleHomeEndKeys
      disableClearable={disableClearable}
      style={{ width }}
      options={options}
      value={selected}
      disabled={disabled}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      getOptionSelected={(option, value) =>
        option.id === value.id || value === ''
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholderText}
          variant={outline}
          margin="dense"
          InputLabelProps={{ shrink: false }}
        />
      )}
    />
  )
}

export default SearchSelect

SearchSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  selected: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholderText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outline: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  getOptionLabel: PropTypes.func.isRequired,
  disableClearable: PropTypes.bool,
  isMobile: PropTypes.bool,
}

SearchSelect.defaultProps = {
  options: [],
  selected: null,
  disabled: false,
  placeholderText: '',
  width: 300,
  outline: 'standard',
  disableClearable: false,
  isMobile: false,
}
