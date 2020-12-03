import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
// import Autocomplete from '@material-ui/lab/Autocomplete'

import SearchSelect from './SearchSelect'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    // backgroundColor: '#1B2152',
    backgroundColor: 'white',
    // color: "grey",
    // "& .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "white"
    // },
    // "&:hover .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "white"
    // },
    // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "white"
    // }
  },
}))

const StateSearchSelect = ({ options, selected, onChange, disabled }) => {
  const classes = useStyles()

  return (
    <Autocomplete
      id="state-search-select"
      classes={classes}
      style={{ width: 300 }}
      options={options || []}
      value={selected}
      onChange={(event, newValue) => onChange(newValue)}
      // inputValue={inputValue}
      // onInputChange={(event, newValue) => setInputValue(newValue)}
      getOptionLabel={(option) => (option.name ? option.name : '')}
      getOptionSelected={(option, value) =>
        option.id === value.id || value === ''
      }
      renderInput={(params) => (
        <TextField
          {...params}
          // label={inputValue}
          placeholder="Choose your state"
          variant="standard"
          margin="normal"
          // InputProps={{ ...params.InputLabelProps, }}
          InputLabelProps={{ shrink: false }}
        />
      )}
      disabled={disabled}
      clearOnEscape
    />
  )
}

export default StateSearchSelect

StateSearchSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  selected: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

StateSearchSelect.defaultProps = {
  options: [],
  selected: null,
  disabled: false,
}
