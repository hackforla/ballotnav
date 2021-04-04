import React from 'react'

const Rows = ({ data, columns, keyExtractor }) => {
  return data.map((row) => (
    <tr key={keyExtractor(row)}>
      {columns.map((column, index) => {
        const { field, render, textAlign } = column
        return (
          <td key={index.toString()} style={{ textAlign }}>
            { render ? render(row[field], row) : row[field] }
          </td>
        )
      })}
    </tr>
  ))
}

export default Rows
