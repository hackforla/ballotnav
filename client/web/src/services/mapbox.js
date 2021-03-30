import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const styleUrl = 'mapbox://styles/mapbox/streets-v11'
export default mapboxgl
