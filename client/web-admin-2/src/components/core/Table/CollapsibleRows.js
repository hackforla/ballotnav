import React, { Fragment, useState, useCallback } from 'react'
import CollapseToggle from './CollapseToggle'

const CollapsibleRows = ({ data, columns, keyExtractor, collapse }) => {
  const [uncollapsed, setUncollapsed] = useState([])

  const toggleCollapsed = useCallback((key) => {
    setUncollapsed((uncollapsed) =>
      uncollapsed.includes(key)
        ? uncollapsed.filter((el) => el !== key)
        : [...uncollapsed, key]
    )
  }, [])

  return data.map((row) => {
    const key = keyExtractor(row)
    const isUncollapsed = uncollapsed.includes(key)
    return (
      <Fragment key={key}>
        <tr>
          {columns.map((column, index) => {
            const { field, render, textAlign } = column
            const isLastCol = index === columns.length - 1
            return (
              <td
                key={index.toString()}
                style={{
                  textAlign,
                  position: isLastCol ? 'relative' : undefined,
                }}
              >
                {render ? render(row[field], row) : row[field]}
                {isLastCol && (
                  <CollapseToggle
                    isUncollapsed={isUncollapsed}
                    onClick={toggleCollapsed.bind(null, key)}
                  />
                )}
              </td>
            )
          })}
        </tr>
        {isUncollapsed && (
          <tr>
            <td
              colSpan={columns.length}
              style={{ maxWidth: 0, padding: 0, overflowY: 'auto' }}
            >
              {collapse(row)}
            </td>
          </tr>
        )}
      </Fragment>
    )
  })
}

export default CollapsibleRows
