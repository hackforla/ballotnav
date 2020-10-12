import React, { useState } from 'react'
import {
  makeStyles,
  TableRow,
  TableCell,
  Box,
  Checkbox,
  Collapse,
} from '@material-ui/core'
import { editableFields } from 'models'
import AutoForm from 'components/core/AutoForm'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      // borderBottom: 'unset',
    },
  },
  collapseRoot: {
    '& > *': {
      borderBottom: 'unset'
    },
  },
});

function Row({ model, row, isItemSelected, onClick, labelId, onSave }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [values, setValues] = useState({ ...row, isValidated: false })

  const toggle = () => setOpen(!open)

  const handleChange = (newValues) => {
    setValues({
      ...values,
      ...newValues,
    })
    onSave({
      ...values,
      ...newValues,
    })
  }

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        className={classes.root}
      >
        {/*<TableCell>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </TableCell>*/}
        <TableCell padding="checkbox">
          <Checkbox
            checked={values.isValidated}
            inputProps={{ 'aria-labelledby': labelId }}
            onChange={(event, isValidated) => handleChange({ isValidated })}
          />
        </TableCell>
        {editableFields(model).map((field, idx) => {
          if (idx === 0)
            return (
              <TableCell
                key={field}
                id={labelId}
                style={{ cursor: 'pointer' }}
                onClick={toggle}
                component='th'
                scope='row'>
                <div style={{ width: 150, fontWeight: 'bold' }}>{values[field]}</div>
              </TableCell>
            )
          else
            return (
              <TableCell
                key={field}
                style={{ cursor: 'pointer' }}
                onClick={toggle}
                align='right'>
                {values[field]}
              </TableCell>
            )
        })}
      </TableRow>
      <TableRow className={classes.collapseRoot}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <AutoForm
                model={model}
                initialValues={row}
                submitText='Update Location'
                onSubmit={(values, funcs) => {
                 handleChange(values)
                 setOpen(false)
                 funcs.setSubmitting(false)
                }}
                style={{ maxWidth: 400 }}
             />
            </Box>
           </Collapse>
         </TableCell>
       </TableRow>
    </>
  );
}

export default Row
