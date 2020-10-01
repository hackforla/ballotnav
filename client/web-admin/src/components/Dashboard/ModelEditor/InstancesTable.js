import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    display: 'inline-block'
  },
});

function filteredFields(model) {
  return Object.keys(model.fields.default).filter(field => (
    field !== 'createdAt' &&
    field !== 'updatedAt' &&
    field !== 'id' &&
    !field.endsWith('Id')
  ))
}

export default function DenseTable({ model, instances, basepath }) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={100}>action</TableCell>
            {filteredFields(model).map(field => (
              <TableCell key={field} align='right'>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((instance, idx) => (
            <TableRow key={instance.id}>
              <TableCell width={100}>
                <Button onClick={() => history.push(`${basepath}/${instance.id}`)}>
                  View
                </Button>
              </TableCell>
              {filteredFields(model).map(field => (
                <TableCell key={field} align='right'>{ instance[field] }</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
