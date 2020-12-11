export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(new Error('geolocation not supported'))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position:', position)
        resolve({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  })
}
