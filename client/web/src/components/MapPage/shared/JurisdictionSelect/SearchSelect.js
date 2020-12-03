import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const StyledSearchSelect = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
    display: 'inline-block',
  },
  inputRoot: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid #FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    fontWeight: 700,
    marginBottom: '5px',
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
      width: '15px',
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
  },
}))(Autocomplete)

const SearchSelect = ({
  options,
  selected,
  onChange,
  disabled,
  placeholderText,
  width,
}) => (
  <StyledSearchSelect
    // debug
    autoComplete
    clearOnEscape
    disableListWrap
    handleHomeEndKeys
    style={{ width }}
    options={options}
    value={selected}
    onChange={(event, newValue) => onChange(newValue)}
    getOptionLabel={(option) => (option.name ? option.name : '')}
    getOptionSelected={(option, value) =>
      option.id === value.id || value === ''
    }
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={placeholderText}
        variant="standard"
        margin="normal"
        InputLabelProps={{ shrink: false }}
      />
    )}
    disabled={disabled}
  />
)

export default SearchSelect

SearchSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  selected: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholderText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

SearchSelect.defaultProps = {
  options: [],
  selected: null,
  disabled: false,
  placeholderText: '',
  width: 300,
}
