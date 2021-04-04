import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HeaderRow from './HeaderRow'
import Rows from './Rows'
import CollapsibleRows from './CollapsibleRows'

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    color: theme.palette.primary.main,
    userSelect: 'none',
    '& th': {
      backgroundColor: '#EBF3FA',
      '& > div': {
        display: 'flex',
        alignItems: 'center'
      },
    },
    '& th, & td': {
      textAlign: 'left',
      padding: '1.25em',
    },
    '& tbody tr': {
      borderBottom: '1px #C3C8E4 solid',
    },
  },
}))

const Table = ({ data, columns, keyExtractor = (row) => row.id, collapse }) => {
  const classes = useStyles()
  const [sortCol, setSortCol] = useState(-1)
  const [sortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    // default to first sortable column
    setSortCol(columns.findIndex((col) => col.sort))
    setSortDirection('desc')
  }, [columns])

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
            data={sortedData}
            columns={columns}
            keyExtractor={keyExtractor}
            collapse={collapse}
          />
        ) : (
          <Rows
            data={sortedData}
            columns={columns}
            keyExtractor={keyExtractor}
          />
        )}
      </tbody>
    </table>
  )
}

export default Table
