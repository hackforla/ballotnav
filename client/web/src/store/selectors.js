import { createSelector } from 'reselect'
import distance from '@turf/distance'
import queryString from 'query-string'

/////////////////// ROUTER ///////////////////

const search = (state) => state.router.location.search
const query = createSelector(
  [search],
  (search) => {
    const parsed = queryString.parse(search)
    return {
      jid: +parsed.jid || null,
      lid: +parsed.lid || null,
      lng: +parsed.lng || null,
      lat: +parsed.lat || null,
      address: parsed.address || null,
    }
  },
)

export const selectedJurisdictionId = createSelector([query], (q) => q.jid)
export const selectedLocationId = createSelector([query], (q) => q.lid)
export const userAddress = createSelector([query], (q) => q.address)

const userLng = createSelector([query], (q) => q.lng)
const userLat = createSelector([query], (q) => q.lat)
export const userLocation = createSelector(
  [userLng, userLat],
  (lng, lat) => lng && lat ? { lng, lat } : null
)

/////////////////// DATA ///////////////////

export const isLoading = (state) => state.data.isLoading
export const state = (state) => state.data.state
export const jurisdiction = (state) => state.data.jurisdiction
export const locations = (state) => state.data.locations
export const statesWithJurisdictions = (state) =>
  state.data.statesWithJurisdictions

const geocodedLocations = createSelector([locations], (locations) => {
  if (!locations) return []

  const filteredLocations = locations.filter(
    (loc) => loc.geomLongitude && loc.geomLatitude
  )

  const numMissing = locations.length - filteredLocations.length
  if (numMissing > 0) console.log(`locations not geocoded: ${numMissing}`)

  return filteredLocations
})

/////////////////// MODALS ///////////////////

export const modals = (state) => state.modals

/////////////////// COMBINED ///////////////////

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
