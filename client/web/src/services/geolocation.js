export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(new Error('geolocation not supported'))

    navigator.geolocation.getCurrentPosition(
      (position) => {
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
        timeout: 7000,
        maximumAge: 0,
      }
    )
  })
}
