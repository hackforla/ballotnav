import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useSize from 'hooks/useSize'

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
    marginBottom: 5,
    '& > span': {
      borderRadius: 2,
      width: 30,
      height: 4,
      backgroundColor: theme.palette.grey[300],
    },
  },
}))

const Toggler = ({ position, onChange, children, tallContent, shortContent }) => {
  const classes = useStyles()
  const container = useRef(null)
  const slider = useRef(null)
  const content = useRef(null)
  const shortContentRef = useRef(null)
  const shortContentSize = useSize(shortContentRef)
  const [shortContentHeight, setShortContentHeight] = useState(0)
  const [top, setTop] = useState(undefined)

  // adjust top when size of short content changes
  useEffect(() => {
    if (shortContentSize && shortContentSize.height > 0) {
      setShortContentHeight(shortContentSize.height)
    }
  }, [shortContentSize])

  useEffect(() => {
    setTop((() => {
      const { offsetHeight } = container.current
      switch(position) {
        case 'closed': return offsetHeight
        case 'short': return offsetHeight - shortContentHeight
        case 'tall': return 0
        default: return 0
      }
    })())
  }, [position, shortContentHeight])

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

  const cutoff = container.current
    ? container.current.offsetHeight - shortContentHeight - 20
    : 0

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
          <div style={{ display: top < cutoff ? 'block' : 'none' }}>
            <div className={classes.handle}><span /></div>
            { tallContent }
          </div>
          <div
            ref={shortContentRef}
            style={{ display: top >= cutoff ? 'block' : 'none' }}>
            <div className={classes.handle}><span /></div>
            { shortContent }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toggler
