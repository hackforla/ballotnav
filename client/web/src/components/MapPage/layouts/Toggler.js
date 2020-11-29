import React, { useRef, useState } from 'react'

const Toggle = ({ shortContent, longContent }) => {
  const container = useRef(null)
  const content = useRef(null)
  const [contentType, setContentType] = useState('short')

  const onTouchStart = (e) => {
    const offset = e.touches[0].clientY - content.current.offsetTop
    const origTop = content.current.offsetTop
    let direction = null

    const onTouchMove = (e) => {
      const top = Math.max(0, e.touches[0].clientY - offset)
      if (direction === null) {
        if (top < origTop) {
          direction = 'up'
          setContentType('long')
        } else if (top > origTop) {
          direction = 'down'
          if (contentType === 'long')
            setContentType('short')
        }
      }
      content.current.style.top = `${top}px`
    }

    const onTouchEnd = (e) => {
      console.log('touchend', e)
      document.documentElement.style.overflow = ''
      content.current.removeEventListener('touchmove', onTouchMove)

      switch(direction) {
        case 'up':
          content.current.style.top = '0px'
          content.current.style.transition = 'all 0.25s ease-in-out'
          break
        case 'down':
          content.current.style.transition = 'all 0.25s ease-in-out'
          if (contentType === 'short')
            content.current.style.top = '100%'
          else
            content.current.style.top = '400px'
          break
        default:
          break
      }
    }

    document.documentElement.style.overflow = 'hidden'
    content.current.style.transition = ''
    content.current.addEventListener('touchmove', onTouchMove)
    content.current.addEventListener('touchend', onTouchEnd, { once: true })
  }

  return (
    <div ref={container} style={{ height: '100%' }}>
      <div
        onTouchStart={onTouchStart}
        ref={content}
        style={{
          position: 'absolute',
          top: 400,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'all',
          backgroundColor: '#FFF',
        }}
      >
        <div style={{ display: contentType === 'short' ? 'block' : 'none' }}>
          { shortContent }
        </div>
        <div style={{ display: contentType === 'long' ? 'block' : 'none' }}>
          { longContent }
        </div>
      </div>
    </div>
  )
}

export default Toggle
