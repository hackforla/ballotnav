import React, { useEffect } from 'react'
import { useHeader } from './Layout'

function Review() {
  const { setTitle } = useHeader()

  useEffect(() => {
    setTitle('Review WIP')
  }, [])

  return <div>What should go here?</div>
}

export default Review
