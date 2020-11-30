import React, { useRef, useState } from 'react'
import HeightMeasurer from './HeightMeasurer'

const Toggle = ({ shortContent, longContent, onClose }) => {
  const container = useRef(null)
  const content = useRef(null)
  const [contentType, setContentType] = useState('short')
  const [top, setTop] = useState(Infinity)
  const [shortContentHeight, setShortContentHeight] = useState(0)

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
      setTop(top)
    }

    const onTouchEnd = (e) => {
      console.log('touchend', e)
      document.documentElement.style.overflow = ''
      content.current.removeEventListener('touchmove', onTouchMove)

      switch(direction) {
        case 'up':
          setTop(0)
          content.current.style.transition = 'all 0.25s ease-in-out'
          break
        case 'down':
          content.current.style.transition = 'all 0.25s ease-in-out'
          if (contentType === 'short') {
            setTop(Infinity)
            onClose()
          } else
            setTop(container.current.offsetHeight - shortContentHeight)
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

  const onMeasure = (height) => {
    if (top === Infinity) {
      content.current.style.transition = 'all 0.25s ease-in-out'
      setTop(container.current.offsetHeight - height)
    }
    console.log('shortContentHeight:', height)
    console.log('container.current.offsetHeight', container.current.offsetHeight)
    if (height !== 0)
      setShortContentHeight(height)
  }

  console.log('top:', top)

  return (
    <div ref={container} style={{ height: '100%' }}>
      <div
        onTouchStart={onTouchStart}
        ref={content}
        style={{
          position: 'absolute',
          top: top === Infinity ? '100%' : top,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'all',
          backgroundColor: '#FFF',
        }}
      >
        <div style={{ display: top > 375 ? 'block' : 'none' }}>
          <HeightMeasurer onMeasure={onMeasure}>
            { shortContent }
          </HeightMeasurer>
        </div>
        <div style={{ display: top <= 375 ? 'block' : 'none', paddingTop: 10 }}>
          { longContent }
        </div>
        {/*<div style={{ display: contentType === 'short' ? 'block' : 'none' }}>
          { shortContent }
        </div>
        <div style={{ display: contentType === 'long' ? 'block' : 'none' }}>
          { longContent }
        </div>*/}
      </div>
    </div>
  )
}

export default Toggle
