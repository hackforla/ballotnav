import mapboxgl from 'mapbox-gl'

/*
TODO:
This token and the styleUrl are from Alex Choi's account. Move the style into a
ballotnav mapbox account, get a token from that account, and import the
token from process.env instead of hardcoding it here.
*/
mapboxgl.accessToken =
  'pk.eyJ1Ijoib2tkdW5jYW4iLCJhIjoiY2tnYnk5MGNwMGxydjJ6cXFhOGoxdTBzMCJ9.cFaN1ASx3IKkh1RnofRGpw'
export const styleUrl = 'mapbox://styles/okduncan/ckglh4q9b07ug19qkg2je0mxl'

export default mapboxgl
