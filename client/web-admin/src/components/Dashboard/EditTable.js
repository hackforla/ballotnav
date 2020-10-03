// adapted from here: https://material-ui.com/components/tables/
// see Sorting & Selecting

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Collapse,
  Box,
  Button,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@material-ui/icons'
import { editableFields } from 'models'
import AutoForm from './AutoForm'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/*<TableCell />*/}
        <TableCell padding="default">
          {/*<Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />*/}
          isValidated
        </TableCell>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            align={idx === 0 ? 'left' : 'right'}
            //padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  buttonLabel: {
    whiteSpace: 'nowrap'
  }
}));

const EnhancedTableToolbar = ({ numSelected, tabLabel }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Edit { tabLabel }
        </Typography>
      )}

      {/*{numSelected === 0 ? (
        <Tooltip title="Delete">
          <span>
            <Button classes={{ label: classes.buttonLabel }} variant="contained" color="primary">
              Save Changes
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}*/}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tabLabel: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ model, instances, tabLabel }) {
  // const headCells = [
  //   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  //   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  //   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  //   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  //   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
  // ];

  const headCells = editableFields(model).map(field => ({
    id: field,
    disablePadding: true,
    label: field,
  }))

  const rows = instances

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} tabLabel={tabLabel} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      key={row.id}
                      row={row}
                      model={model}
                      isItemSelected={isItemSelected}
                      onClick={(event) => handleClick(event, row.id)}
                      labelId={labelId}
                      onSave={(row) => console.log('saving:', row)}
                    />
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
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
  }

  const handleSave = () => {
    console.log('saving:', values)
    //onSave(values)
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
              <TableCell style={{ cursor: 'pointer' }} onClick={toggle} component='th' key={field} id={labelId} scope='row'>
                <div style={{ width: 150, fontWeight: 'bold' }}>{values[field]}</div>
              </TableCell>
            )
          else
            return (
              <TableCell style={{ cursor: 'pointer' }} onClick={toggle} key={field} align='right'>
                {values[field]}
              </TableCell>
            )
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
