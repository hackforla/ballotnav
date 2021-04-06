import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
    backgroundColor: '#EBF3FA',
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

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, { value: -1, label: 'All' }]

const TableControls = ({
  rowCount,
  pageIndex,
  onChangePageIndex,
  rowsPerPage,
  onChangeRowsPerPage,
  dense,
  onChangeDense,
}) => {
  const classes = useStyles()

  const handleChangeDense = useCallback((e, val) => {
    onChangeDense(val)
  }, [onChangeDense])

  const handleChangePage = useCallback((e, val) => {
    onChangePageIndex(val)
  }, [onChangePageIndex])

  const handleChangeRowsPerPage = useCallback((e) => {
    onChangeRowsPerPage(+e.target.value)
  }, [onChangeRowsPerPage])

  const labelDisplayedRows = useCallback(({ from, to, count }) => {
    return to === -1
      ? `${count} of ${count}`
      : `${from}-${to} of ${count}`
  }, [])

  const page = pageIndex > Math.floor(rowCount / rowsPerPage) ? 0 : pageIndex

  return (
    <div className={classes.root}>
      <div className={classes.density}>
        <Switch
          checked={dense}
          onChange={handleChangeDense}
          color="primary"
        />
        <div>Dense</div>
      </div>
      <div className={classes.pager}>
        <TablePagination
          component="div"
          count={rowCount}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={labelDisplayedRows}
          SelectProps={{ native: true }}
        />
      </div>
    </div>
  )
}

export default TableControls
