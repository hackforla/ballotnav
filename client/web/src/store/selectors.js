import { createSelector } from 'reselect'
import distance from '@turf/distance'

export const query = (state) => state.query
export const isLoading = (state) => state.data.isLoading
export const state = (state) => state.data.state
export const jurisdiction = (state) => state.data.jurisdiction
export const locations = (state) => state.data.locations
export const statesWithJurisdictions = (state) =>
  state.data.statesWithJurisdictions
export const userLocation = (state) => state.query.lngLat
export const selectedLocationId = (state) => state.ui.selectedLocationId
export const showLocationDetail = (state) => state.ui.showLocationDetail

/*
  Adds a 'distanceFromUser' property to each location and sorts
  the locations by distance. If the location is not geocoded
  the distanceFromUser is Infinity and the location appears at
  the end of the list.
*/
export const sortedLocations = createSelector(
  [locations, userLocation],
  (locations, userLocation) => {
    if (!locations) return []
    if (!userLocation) return locations

    return locations
      .map((loc) => ({
        ...loc,
        distanceFromUser:
          loc.geomLongitude && loc.geomLatitude
            ? distance(
                [userLocation.lng, userLocation.lat],
                [loc.geomLongitude, loc.geomLatitude],
                { units: 'miles' }
              )
            : Infinity,
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
