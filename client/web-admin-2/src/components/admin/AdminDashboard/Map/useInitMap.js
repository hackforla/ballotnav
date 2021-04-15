import { useState, useEffect } from 'react'
import mapboxgl, { styleUrl } from 'services/mapbox'
import * as config from './config'

export default function useInitMap(mapContainer) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      bounds: config.CONTINENTAL_US,
      fitBoundsOptions: config.FIT_BOUNDS_OPTIONS,
    })

    map.on('load', () => setMap(map))
  }, [mapContainer])

  return map
}
