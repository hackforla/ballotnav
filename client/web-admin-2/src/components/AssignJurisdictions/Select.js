import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(1),
    width: '100%',
  },
  inputLabel: {
    fontSize: '14px',
  },
  select: {
    fontSize: '12px',
  },
  menuItem: {
    fontSize: '11px',
  }
}))

function SimpleSelect({
  label,
  items,
  schema,
  onChange,
  disabled,
}) {
  const classes = useStyles()
  const [selected, setSelected] = React.useState('')
  const { value, labelText } = schema

  const handleChange = (e) => {
    const { value } = e.target
    setSelected(value)
    onChange(value)
  }

  return (
    <div>
      <FormControl className={classes.formControl} disabled={disabled}>
        <InputLabel className={classes.inputLabel} id="simple-select-label">{label}</InputLabel>
        <Select
          className={classes.select}
          labelId="simple-select-label"
          id="simple-select"
          value={selected}
          onChange={handleChange}
          label={label}
        >
          {
            items && items.map((item, idx) => (
              <MenuItem dense key={item[labelText] + idx} className={classes.menuItem} value={item[value]}>
                {item[labelText]}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default SimpleSelect;
