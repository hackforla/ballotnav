import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import useSize from 'hooks/useSize'

const TRANSITION = 'all 0.25s ease-in-out'
const SLIDE_BUFFER = 20

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
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

const VerticalSlider = ({
  position,
  onChange,
  tallContent,
  shortContent,
  onShortContentHeightChange,
}) => {
  const classes = useStyles()
  const container = useRef(null)
  const slider = useRef(null)
  const shortContentRef = useRef(null)
  const shortContentSize = useSize(shortContentRef)
  const [shortContentHeight, setShortContentHeight] = useState(0)
  const [top, setTop] = useState(undefined)

  // save height of short content when it changes
  useEffect(() => {
    if (shortContentSize && shortContentSize.height > 0) {
      setShortContentHeight(shortContentSize.height)
      onShortContentHeightChange(shortContentSize.height)
    }
  }, [shortContentSize, onShortContentHeightChange])

  useEffect(() => {
    setTop(
      (() => {
        const { offsetHeight } = container.current
        switch (position) {
          case 'closed':
            return offsetHeight
          case 'short':
            return offsetHeight - shortContentHeight
          case 'tall':
            return 0
          default:
            return 0
        }
      })()
    )
  }, [position, shortContentHeight])

  const onDragStart = useCallback(
    (type, e) => {
      const config = (() => {
        switch (type) {
          case 'touch':
            return {
              clientY: (e) => e.touches[0].clientY,
              dragEvent: 'touchmove',
              dragEndEvent: 'touchend',
            }
          case 'mouse':
            return {
              clientY: (e) => e.clientY,
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
        const top = clamp(
          config.clientY(e) - offset,
          0,
          container.current.offsetHeight - shortContentHeight,
        )

        if (direction === null) {
          if (top < origTop) direction = 'up'
          else if (top > origTop) direction = 'down'
        }

        setTop(top)
      }

      const onDragEnd = (e) => {
        // animate transition if appropriate
        if (
          (position === 'short' && direction === 'up') ||
          (position === 'tall' && direction === 'down')
        ) {
          slider.current.style.transition = TRANSITION
          slider.current.addEventListener('transitionend', () => {
            slider.current.style.transition = ''
          }, { once: true })
        }

        // cleanup: restore pull-to-refresh and remove listener
        document.documentElement.style.overflow = ''
        slider.current.removeEventListener(config.dragEvent, onDrag)

        // inform parent of new positiion
        switch (direction) {
          case 'up':
            return onChange('tall')
          case 'down':
            return onChange(position === 'short' ? 'closed' : 'short')
          default:
            return
        }
      }

      // disable pull-to-refresh while dragging
      document.documentElement.style.overflow = 'hidden'

      slider.current.addEventListener(config.dragEvent, onDrag)
      slider.current.addEventListener(config.dragEndEvent, onDragEnd, {
        once: true,
      })
    },
    [onChange, position, shortContentHeight]
  )

  const cutoff = useMemo(() => {
    return container.current
      ? container.current.offsetHeight - shortContentHeight - SLIDE_BUFFER
      : 0
  }, [shortContentHeight])

  return (
    <div ref={container} className={classes.root}>
      <div
        ref={slider}
        onTouchStart={onDragStart.bind(null, 'touch')}
        onMouseDown={onDragStart.bind(null, 'mouse')}
        className={classes.slider}
        style={{ top }}
      >
        <div style={{ display: top < cutoff ? 'block' : 'none' }}>
          <div className={classes.handle}>
            <span />
          </div>
          {tallContent}
        </div>
        <div
          ref={shortContentRef}
          style={{ display: top >= cutoff ? 'block' : 'none' }}
        >
          {shortContent && (
            <>
              <div className={classes.handle}>
                <span />
              </div>
              {shortContent}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerticalSlider

VerticalSlider.propTypes = {
  position: PropTypes.oneOf(['closed', 'short', 'tall']),
  onChange: PropTypes.func,
  shortContent: PropTypes.node,
  tallContent: PropTypes.node,
  onShortContentHeightChange: PropTypes.func,
}

VerticalSlider.defaultProps = {
  position: 'closed',
  onChange: (position) => {},
  shortContent: null,
  tallContent: null,
  onShortContentHeightChange: (height) => {},
}
