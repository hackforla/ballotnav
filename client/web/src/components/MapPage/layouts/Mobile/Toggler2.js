import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const TRANSITION = 'all 0.25s ease-in-out'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    cursor: 'grab',
    pointerEvents: 'all',
  },
  handle: {
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > span': {
      borderRadius: 2,
      width: 30,
      height: 4,
      backgroundColor: theme.palette.grey[300],
    },
  },
}))

const Toggler = ({ position, onChange, children }) => {
  const classes = useStyles()
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

  const onDragStart = (type, e) => {
    const config = (() => {
      switch(type) {
        case 'touch':
          return {
            clientY: e => e.touches[0].clientY,
            dragEvent: 'touchmove',
            dragEndEvent: 'touchend'
          }
        case 'mouse':
          return {
            clientY: e => e.clientY,
            dragEvent: 'mousemove',
            dragEndEvent: 'mouseup',
          }
        default:
          return null
      }
    })()

    const origTop = slider.current.offsetTop
    const offset = config.clientY(e) - origTop
    let direction = null

    const onDrag = (e) => {
      const top = Math.max(0, config.clientY(e) - offset)
      if (direction === null) {
        if (top < origTop) direction = 'up'
        else if (top > origTop) direction = 'down'
      }
      setTop(top)
    }

    const onDragEnd = (e) => {
      document.documentElement.style.overflow = ''
      slider.current.style.transition = TRANSITION
      slider.current.removeEventListener(config.dragEvent, onDrag)

      switch(direction) {
        case 'up': return onChange('tall')
        case 'down': return onChange(position === 'short' ? 'closed' : 'short')
        default: return
      }
    }

    document.documentElement.style.overflow = 'hidden'
    slider.current.style.transition = ''
    slider.current.addEventListener(config.dragEvent, onDrag)
    slider.current.addEventListener(config.dragEndEvent, onDragEnd, { once: true })
  }

  return (
    <div ref={container} className={classes.root}>
      <div
        ref={slider}
        onTouchStart={onDragStart.bind(null, 'touch')}
        onMouseDown={onDragStart.bind(null, 'mouse')}
        className={classes.slider}
        style={{ top, transition: TRANSITION }}
      >
        <div ref={content}>
          <div className={classes.handle}><span /></div>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Toggler
