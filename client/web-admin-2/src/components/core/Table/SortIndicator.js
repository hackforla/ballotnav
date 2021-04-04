import React from 'react'

const SortIndicator = ({ direction }) => (
  <div style={{ height: '1.4em', width: '1.4em' }}>
    <svg viewBox="0 0 24 24">
      <polygon
        fillOpacity={direction === 'asc' ? 1 : 0.3}
        points='7,10 17,10, 12,5'
      />
      <polygon
        fillOpacity={direction === 'desc' ? 1 : 0.3}
        points='7,14 17,14, 12,19'
      />
    </svg>
  </div>
)

export default SortIndicator
