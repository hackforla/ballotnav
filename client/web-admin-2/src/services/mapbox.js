import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const styleUrl = 'mapbox://styles/mapbox/dark-v10'
export default mapboxgl
