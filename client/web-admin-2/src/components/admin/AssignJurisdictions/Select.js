import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
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

  if (!items) return null
  return (
    <TextField
      select
      className={classes.select}
      id="simple-select"
      value={selected}
      onChange={handleChange}
      label={label}
      fullWidth
    >
      {
        items && items.map((item, idx) => (
          <MenuItem dense key={item[labelText] + idx} className={classes.menuItem} value={item[value]}>
            {item[labelText]}
          </MenuItem>
        ))
      }
    </TextField>
  )
}

export default SimpleSelect;
