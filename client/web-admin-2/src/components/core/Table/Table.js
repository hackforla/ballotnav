import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HeaderRow from './HeaderRow'
import Rows from './Rows'
import Controls from './Controls'

const TD_HEIGHT = 60
const TD_HEIGHT_DENSE = 40

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    color: theme.palette.primary.main,
    userSelect: 'none',
    tableLayout: 'fixed',
    '& th': {
      backgroundColor: '#EBF3FA',
      '& > div': {
        display: 'flex',
        alignItems: 'center'
      },
    },
    '& th, & td': {
      textAlign: 'left',
      padding: ({ dense }) => dense ? '0 0.75em' : '0 1.25em',
      height: ({ dense }) => dense ? TD_HEIGHT_DENSE : TD_HEIGHT,
    },
    '& tbody tr:not(:last-child)': {
      borderBottom: '1px #C3C8E4 solid',
    },
  },
}))

const Table = ({ data, columns, keyExtractor = (row) => row.id, collapse }) => {
  const [dense, setDense] = useState(false)
  const classes = useStyles({ dense })
  const [sortCol, setSortCol] = useState(-1)
  const [sortDirection, setSortDirection] = useState('desc')
  const [pageIndex, setPageIndex] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(data.length < 5 ? -1 : 5)

  // reset sorting when columns change
  // default to first sortable column
  useEffect(() => {
    setSortCol(columns.findIndex((col) => col.sort))
    setSortDirection('desc')
  }, [columns])

  // reset paging when data changes
  useEffect(() => {
    setPageIndex(0)
  }, [data])

  const sortedData = useMemo(() => {
    if (!data) return null
    if (!columns[sortCol]) return data

    const { sort, field } = columns[sortCol]

    // use default sort algo where sort === true and field is provided
    const sortFunc = sort === true && field
      ? (a, b) => b[field] > a[field] ? 1 : -1
      : sort

    const sorted = [...data].sort(sortFunc)
    if (sortDirection === 'desc') sorted.reverse()
    return sorted
  }, [data, columns, sortCol, sortDirection])

  const pagedData = useMemo(() => {
    if (!sortedData) return null
    if (rowsPerPage === -1) return sortedData

    const start = pageIndex * rowsPerPage
    const end = start + rowsPerPage
    return sortedData.slice(start, end)
  }, [sortedData, pageIndex, rowsPerPage])

  const handleColumnClick = useCallback((colIndex) => {
    if (colIndex !== sortCol) {
      setSortCol(colIndex)
      setSortDirection('desc')
    } else {
      setSortDirection((dir) => dir === 'asc' ? 'desc' : 'asc')
    }
  }, [sortCol])

  if (!pagedData) return null
  
  let emptyRows = rowsPerPage - pagedData.length
  if (pagedData.length === 0) emptyRows -= 1
  return (
    <div>
      <table className={classes.table}>
        <thead>
          <HeaderRow
            columns={columns}
            onClick={handleColumnClick}
            sortCol={sortCol}
            sortDirection={sortDirection}
          />
        </thead>
        <tbody>
          <Rows
            data={pagedData}
            columns={columns}
            keyExtractor={keyExtractor}
            collapse={collapse}
          />
          {pagedData.length === 0 && (
            <tr>
              <td colSpan={columns.length}><i>No data.</i></td>
            </tr>
          )}
          {emptyRows > 0 && (
            <tr
              style={{
                height: (dense ? TD_HEIGHT_DENSE : TD_HEIGHT) * emptyRows
              }}
            >
              <td colSpan={columns.length} />
            </tr>
          )}
        </tbody>
      </table>
      <Controls
        rowCount={data.length}
        pageIndex={pageIndex}
        onChangePageIndex={setPageIndex}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={setRowsPerPage}
        dense={dense}
        onChangeDense={setDense}
      />
    </div>
  )
}

export default Table
