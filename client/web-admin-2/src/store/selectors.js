import { useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

export const auth = (state) => state.auth
export const toaster = (state) => state.toaster
export const myJurisdictions = (state) => state.volunteer.myJurisdictions
export const jurisdictionTabs = (state) => state.volunteer.jurisdictionTabs
export const wipJurisdictions = (state) => state.volunteer.wipJurisdictions

export const useAuth = () => useSelector(auth)
export const useToaster = () => useSelector(toaster)
export const useMyJurisdictions = () => useSelector(myJurisdictions)
export const useJurisdictionTabs = () => useSelector(jurisdictionTabs)
export const useWipJurisdictions = () => useSelector(wipJurisdictions)
