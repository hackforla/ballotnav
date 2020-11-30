import React, { useRef, useState, useEffect } from 'react'

const TRANSITION = 'all 0.25s ease-in-out'

const Toggler = ({ position, onChange, children }) => {
  const container = useRef(null)
  const slider = useRef(null)
  const content = useRef(null)
  const [top, setTop] = useState('100%')

  useEffect(() => {
    setTop((() => {
      switch(position) {
        case 'closed': return container.current.offsetHeight
        case 'short': return container.current.offsetHeight - content.current.offsetHeight
        case 'tall': return 0
        default: return 0
      }
    })())
  }, [position])

  const onTouchStart = (e) => {
    const origTop = slider.current.offsetTop
    const offset = e.touches[0].clientY - origTop
    let direction = null

    const onTouchMove = (e) => {
      const top = Math.max(0, e.touches[0].clientY - offset)
      if (direction === null) {
        if (top < origTop) direction = 'up'
        else if (top > origTop) direction = 'down'
      }
      setTop(top)
    }

    const onTouchEnd = (e) => {
      document.documentElement.style.overflow = ''
      slider.current.style.transition = TRANSITION
      slider.current.removeEventListener('touchmove', onTouchMove)

      switch(direction) {
        case 'up': return onChange('tall')
        case 'down': return onChange(position === 'short' ? 'closed' : 'short')
        default: return
      }
    }

    document.documentElement.style.overflow = 'hidden'
    slider.current.style.transition = ''
    slider.current.addEventListener('touchmove', onTouchMove)
    slider.current.addEventListener('touchend', onTouchEnd, { once: true })
  }

  return (
    <div ref={container} style={{ height: '100%' }}>
      <div
        ref={slider}
        onTouchStart={onTouchStart}
        style={{
          position: 'absolute',
          top,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFF',
          pointerEvents: 'all',
          transition: TRANSITION,
        }}
      >
        <div ref={content}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Toggler
