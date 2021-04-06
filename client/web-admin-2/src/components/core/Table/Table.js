import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HeaderRow from './HeaderRow'
import Rows from './Rows'
import CollapsibleRows from './CollapsibleRows'
import Controls from './Controls'

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
      padding: ({ dense }) => dense ? '0.75em' : '1.25em',
    },
    '& tbody tr': {
      borderBottom: '1px #C3C8E4 solid',
    },
  },
}))

const Table = ({ data, columns, keyExtractor = (row) => row.id, collapse }) => {
  const [dense, setDense] = useState(true)
  const classes = useStyles({ dense })
  const [sortCol, setSortCol] = useState(-1)
  const [sortDirection, setSortDirection] = useState('desc')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageLength, setPageLength] = useState(10)

  useEffect(() => {
    // default to first sortable column
    setSortCol(columns.findIndex((col) => col.sort))
    setSortDirection('desc')
  }, [columns])

  // reset page index when data changes
  useEffect(() => setPageIndex(0), [data])

  const sortedData = useMemo(() => {
    if (!data) return null
    if (!columns[sortCol]) return data

    const { sort, field } = columns[sortCol]

    if (sort === true && !field) {
      console.warn('Field not provided, skipping sort.', columns[sortCol])
      return data
    }

    // use default sort algo where sort === true and field is provided
    const sortFunc = sort === true && field
      ? (a, b) => b[field] > a[field] ? 1 : -1
      : sort

    const sorted = [...data].sort(sortFunc)
    if (sortDirection === 'desc') sorted.reverse()
    return sorted
  }, [data, columns, sortCol, sortDirection])

  const pagedData = useMemo(() => {
    const start = pageIndex * pageLength
    const end = start + pageLength
    return sortedData.slice(start, end)
  }, [sortedData, pageIndex, pageLength])

  const handleColumnClick = useCallback((colIndex) => {
    if (colIndex !== sortCol) {
      setSortCol(colIndex)
      setSortDirection('desc')
    } else {
      setSortDirection((dir) => dir === 'asc' ? 'desc' : 'asc')
    }
  }, [sortCol])

  if (!sortedData) return null
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
          {collapse ? (
            <CollapsibleRows
              data={pagedData}
              columns={columns}
              keyExtractor={keyExtractor}
              collapse={collapse}
            />
          ) : (
            <Rows
              data={pagedData}
              columns={columns}
              keyExtractor={keyExtractor}
            />
          )}
        </tbody>
      </table>
      <Controls
        rowCount={data.length}
        pageIndex={pageIndex}
        onChangePageIndex={setPageIndex}
        pageLength={pageLength}
        onChangePageLength={setPageLength}
        dense={dense}
        onChangeDense={setDense}
      />
    </div>
  )
}

export default Table
