import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  },
  density: {
    display: 'flex',
    alignItems: 'center',
  },
  pager: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const TableControls = ({
  rowCount,
  pageIndex,
  onChangePageIndex,
  pageLength,
  onChangePageLength,
  dense,
  onChangeDense,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.density}>
        <Switch
          checked={dense}
          onChange={(e, val) => onChangeDense(val)}
          color="primary"
        />
        <div>Dense</div>
      </div>
      <div className={classes.pager}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={pageLength}
          page={pageIndex > Math.floor(rowCount / pageLength) ? 0 : pageIndex}
          onChangePage={(e, val) => onChangePageIndex(val)}
          onChangeRowsPerPage={(e, val) => onChangePageLength(val)}
        />
      </div>
    </div>
  )
}

export default TableControls
