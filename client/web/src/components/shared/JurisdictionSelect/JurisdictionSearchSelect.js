import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

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

const JurisdictionSearchSelect = ({
  options,
  selected,
  onChange,
  disabled,
}) => {
  const classes = useStyles()
  // const [value, setValue] = useState()
  // const [inputValue, setInputValue] = useState(inputPlaceholder)

  return (
    <Autocomplete
      id="jurisdiction-search-select"
      // remove
      debug
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
          placeholder="Choose your jurisdiction"
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

// const mapStateToProps = (state) => ({
//   states: select.query(state).jurisdictionId,
// })

// const mapDispatchToProps = (dispatch) => ({
// saveQuery: (urlQueryString) => dispatch(saveQuery(urlQueryString)),
// getJurisdiction: (jurisdictionId) =>
//   dispatch(getJurisdiction(jurisdictionId)),
// getStatesWithJurisdictions: () => dispatch(getStatesWithJurisdictions()),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

export default JurisdictionSearchSelect
