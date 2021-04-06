import React from 'react'
import CollapsibleRows from './CollapsibleRows'

const Rows = ({ data, columns, keyExtractor, collapse }) => {
  if (collapse)
    return (
      <CollapsibleRows
        data={data}
        columns={columns}
        keyExtractor={keyExtractor}
        collapse={collapse}
      />
    )

  return data.map((row) => (
    <tr key={keyExtractor(row)}>
      {columns.map((column, index) => {
        const { field, render, textAlign } = column
        return (
          <td key={index.toString()} style={{ textAlign }}>
            {render ? render(row[field], row) : row[field]}
          </td>
        )
      })}
    </tr>
  ))
}

export default Rows
