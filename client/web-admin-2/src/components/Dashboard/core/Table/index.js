import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    color: theme.palette.primary.main,
    '& th': {
      backgroundColor: '#EBF3FA',
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
    // '& tbody tr': {
    //   cursor: 'default',
    //   '&:hover': {
    //     backgroundColor: theme.palette.action.hover,
    //   },
    // },
  },
}))

const Table = ({ data, columns, keyExtractor = (row) => row.id }) => {
  const classes = useStyles()

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index.toString()}>{ column.title }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={keyExtractor(row)}>
            {columns.map((column) => (
              <td key={column.field || column.renderValue}>
                {
                  column.renderValue
                    ? column.renderValue(row)
                    : row[column.field]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
