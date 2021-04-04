import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SortIndicator from './SortIndicator'

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
      '&:last-child': {
        textAlign: 'center',
      },
    },
    '& tbody tr': {
      borderBottom: '1px #C3C8E4 solid',
    },
  },
}))

const Table = ({ data, columns, keyExtractor = (row) => row.id }) => {
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
        <tr>
          {columns.map((column, index) => {
            const { sort, title } = column
            const isSortCol = sortCol === index
            const onClick = sort && handleColumnClick.bind(null, index)
            return (
              <th
                key={index.toString()}
                onClick={onClick}
                style={{
                  cursor: sort ? 'pointer' : 'default',
                  backgroundColor: isSortCol ? '#CDE4F7' : undefined,
                }}
              >
                <div>
                  <div>{ title }</div>
                  {sort && (
                    <SortIndicator
                      direction={isSortCol ? sortDirection : undefined }
                    />
                  )}
                </div>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={keyExtractor(row)}>
            {columns.map((column, index) => {
              const { field, render } = column
              return (
                <td key={index.toString()}>
                  { render ? render(row[field], row) : row[field] }
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
