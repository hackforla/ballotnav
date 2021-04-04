import React, { Fragment, useState } from 'react'

const CollapsibleRows = ({ data, columns, keyExtractor, collapse }) => {
  const [uncollapsed, setUncollapsed] = useState([])

  return data.map((row) => {
    return (
      <Fragment key={keyExtractor(row)}>
        <tr
          onClick={() => {
            const key = keyExtractor(row)
            setUncollapsed((uncollapsed) => {
              if (uncollapsed.includes(key))
                return uncollapsed.filter((el) => el !== key)
              else
                return [...uncollapsed, key]
            })
          }}
        >
          {columns.map((column, index) => {
            const { field, render, textAlign } = column
            return (
              <td key={index.toString()} style={{ textAlign }}>
                { render ? render(row[field], row) : row[field] }
              </td>
            )
          })}
        </tr>
        {collapse && uncollapsed.includes(keyExtractor(row)) && (
          <tr>
            <td colSpan={columns.length}>{ collapse(row) }</td>
          </tr>
        )}
      </Fragment>
    )
  })
}

export default CollapsibleRows
