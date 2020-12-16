import { useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'

const JurisdictionBoundary = ({ map, jurisdiction }) => {
  const theme = useTheme()

  useEffect(() => {
    if (!map || !jurisdiction) return

    map.addSource('boundary', {
      type: 'geojson',
      data: jurisdiction.geojson,
    })

    map.addLayer({
      id: 'boundary-line',
      source: 'boundary',
      type: 'line',
      paint: {
        'line-color': theme.palette.primary.main,
        'line-width': 3,
        'line-blur': 1,
      },
    })

    return () => {
      map.removeLayer('boundary-line')
      map.removeSource('boundary')
    }
  }, [map, jurisdiction, theme])

  return null
}

export default JurisdictionBoundary
