import React, { useState, useMemo, useCallback } from 'react'
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
  const [sortCol, setSortCol] = useState(columns.findIndex((col) => col.sort))
  const [sortDirection, setSortDirection] = useState('desc')

  const sortedData = useMemo(() => {
    if (!data) return null
    if (sortCol === -1) return data

    const sorted = [...data].sort(columns[sortCol].sort)
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
            {columns.map((column) => {
              const { field, renderValue } = column
              return (
                <td key={field || renderValue}>
                  { renderValue ? renderValue(row) : row[field] }
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
