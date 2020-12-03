import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const styleUrl = 'mapbox://styles/mapbox/streets-v11'
export default mapboxgl
