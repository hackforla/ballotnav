import React, { useRef, useEffect } from 'react'

const HeightMeasurer = ({ children, onMeasure }) => {
  const container = useRef(null)
  const oldHeight = useRef(null)

  useEffect(() => {
    const { offsetHeight: height } = container.current
    if (oldHeight.current !== height) {
      oldHeight.current = height
      onMeasure(height)
    }
  }, [onMeasure, children])

  return (
    <div ref={container}>{children}</div>
  )
}

export default HeightMeasurer
