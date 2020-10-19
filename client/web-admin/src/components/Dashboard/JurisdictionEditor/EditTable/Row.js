import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  TableRow,
  TableCell,
  Box,
  // Checkbox,
  Collapse,
} from '@material-ui/core'
import AutoForm from 'components/core/AutoForm'
import LocationForm from '../LocationForm'
import moment from 'moment'

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

function Row({ model, row, isItemSelected, onClick, labelId, onSave, isLocations, displayName }) {
  const classes = useRowStyles()
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = useState(null)

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

  // set values whenever row changes
  useEffect(() => setValues(row), [row])

  if (!values) return null
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
        {/*<TableCell padding="checkbox">
          <Checkbox
            checked={values.isValidated}
            inputProps={{ 'aria-labelledby': labelId }}
            onChange={(event, isValidated) => handleChange({ isValidated })}
          />
        </TableCell>*/}
        {model.tableFields.map((field, idx) => (
          <TableCell
            key={field}
            style={{
              cursor: 'pointer',
              color: values[field] ? undefined : 'lightgrey'
            }}
            onClick={toggle}
            align='left'>
            {(() => {
              if (model.editFields[field].type === 'date') {
                const date = values[field]
                if (!date) return 'none'
                return moment(values[field]).utc().format('yyyy-MM-DD')
              }

              // it's a select field (hopefully) so show the display value
              if (field.endsWith('Id'))
                return model.editFields[field].type.options.find(opt => opt.value === values[field])?.display

              return values[field] || 'none'
            })()}
          </TableCell>
        ))}
      </TableRow>
      <TableRow className={classes.collapseRoot}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} style={{ marginBottom: 50 }}>
              {
                isLocations
                ? (
                  <LocationForm
                    initialValues={row}
                    submitText={`Update Location`}
                    onSubmit={(values, funcs) => {
                      handleChange(values)
                      setOpen(false)
                      funcs.setSubmitting(false)
                    }}
                  />
                ) : (
                  <AutoForm
                    model={model.editFields}
                    initialValues={row}
                    submitText={`Update ${displayName}`}
                    onSubmit={(values, funcs) => {
                     handleChange(values)
                     setOpen(false)
                     funcs.setSubmitting(false)
                    }}
                    style={{ maxWidth: 400 }}
                 />
                )
              }
            </Box>
           </Collapse>
         </TableCell>
       </TableRow>
    </>
  );
}

export default Row
