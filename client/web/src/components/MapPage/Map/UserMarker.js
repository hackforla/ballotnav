import React, { useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import mapboxgl from 'services/mapbox'
import { ReactComponent as UserMarkerIcon } from 'assets/icons/user-marker.svg'

const UserMarker = ({ map, userLocation }) => {
  useEffect(() => {
    if (!userLocation) return

    const el = document.createElement('div')
    el.className = 'user-marker'
    el.style.zIndex = 2
    el.style.pointerEvents = 'none'
    el.innerHTML = renderToString(<UserMarkerIcon />)

    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'center',
    })
      .setLngLat(userLocation)
      .addTo(map)

    return () => marker.remove()
  }, [map, userLocation])

  return null
}

export default UserMarker
