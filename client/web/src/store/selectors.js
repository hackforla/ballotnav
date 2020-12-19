import { createSelector } from 'reselect'
import distance from '@turf/distance'

export const query = (state) => state.query
export const isLoaded = (state) => state.data.isLoaded
export const isLoading = (state) => state.data.isLoading
export const state = (state) => state.data.state
export const jurisdiction = (state) => state.data.jurisdiction
export const locations = (state) => state.data.locations
export const statesWithJurisdictions = (state) =>
  state.data.statesWithJurisdictions
export const selectedLocationId = (state) => state.query.locationId
export const modals = (state) => state.modals

const userLng = (state) => state.query.lngLat?.lng
const userLat = (state) => state.query.lngLat?.lat
export const userLocation = createSelector([userLng, userLat], (lng, lat) =>
  lng && lat ? { lng, lat } : null
)

const geocodedLocations = createSelector([locations], (locations) => {
  if (!locations) return []

  const filteredLocations = locations.filter(
    (loc) => loc.geomLongitude && loc.geomLatitude
  )

  const numMissing = locations.length - filteredLocations.length
  if (numMissing > 0) console.log(`locations not geocoded: ${numMissing}`)

  return filteredLocations
})

/*
  Adds a 'distanceFromUser' property to each geocoded location and sorts
  the locations by distance. If userLocation not given, sorts by location
  name.
*/
export const sortedLocations = createSelector(
  [geocodedLocations, userLocation],
  (locations, userLocation) => {
    if (!userLocation)
      return locations.slice().sort((a, b) => (a.name > b.name ? 1 : -1))

    return locations
      .map((loc) => ({
        ...loc,
        distanceFromUser: distance(
          [userLocation.lng, userLocation.lat],
          [loc.geomLongitude, loc.geomLatitude],
          { units: 'miles' }
        ),
      }))
      .sort((a, b) => a.distanceFromUser - b.distanceFromUser)
  }
)

export const selectedLocation = createSelector(
  [sortedLocations, selectedLocationId],
  (locations, selectedLocationId) =>
    selectedLocationId
      ? locations.find((loc) => loc.id === selectedLocationId)
      : null
)
