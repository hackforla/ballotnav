import React from 'react'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    display: 'inline-block'
  },
  table: {
    display: 'inline-block'
  },
})

function ButtonTable({ columns, rows, buttonText, onClickButton }) {
  const classes = useStyles()

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map(column => (
              <TableCell key={column} align='right'>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button onClick={() => onClickButton(row.id)}>
                  {buttonText}
                </Button>
              </TableCell>
              {columns.map(column => (
                <TableCell key={column} align='right'>{ row[column] }</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ButtonTable
