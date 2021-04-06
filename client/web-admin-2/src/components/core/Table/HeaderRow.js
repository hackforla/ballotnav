import React from 'react'
import SortIndicator from './SortIndicator'

const HeaderRow = ({ columns, onClick, sortCol, sortDirection }) => (
  <tr>
    {columns.map((column, index) => {
      const { sort, title, textAlign } = column
      const isSortCol = sortCol === index
      const handleClick = sort && onClick.bind(null, index)
      return (
        <th
          key={index.toString()}
          onClick={handleClick}
          style={{
            cursor: sort ? 'pointer' : 'default',
            backgroundColor: isSortCol ? '#CDE4F7' : undefined,
            textAlign,
          }}
        >
          <div>
            <div>{title}</div>
            {sort && (
              <SortIndicator
                direction={isSortCol ? sortDirection : undefined}
              />
            )}
          </div>
        </th>
      )
    })}
  </tr>
)

export default HeaderRow
