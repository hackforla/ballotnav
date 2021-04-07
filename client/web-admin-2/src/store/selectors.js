import { useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

export const auth = (state) => state.auth
export const toaster = (state) => state.toaster
// export const myJurisdictions = (state) => state.wip.myJurisdictions
// export const jurisdictionTabs = (state) => state.wip.jurisdictionTabs
// export const wipJurisdictions = (state) => state.wip.wipJurisdictions
export const assignment = (state) => state.assignment
export const releasedJurisdictions = (state) =>
  state.admin.releasedJurisdictions

export const useAuth = () => useSelector(auth)
export const useToaster = () => useSelector(toaster)
// export const useMyJurisdictions = () => useSelector(myJurisdictions)
// export const useJurisdictionTabs = () => useSelector(jurisdictionTabs)
// export const useWipJurisdictions = () => useSelector(wipJurisdictions)
export const useAssignment = () => useSelector(assignment)
export const useReleasedJurisdictions = () => useSelector(releasedJurisdictions)

// export const useMyJurisdiction = (jid) => {
//   const myJurisdictions = useMyJurisdictions()
//   return myJurisdictions.find((j) => j.id === +jid)
// }
//
// export const useWipJurisdiction = (jid) => {
//   const wipJurisdictions = useWipJurisdictions()
//   return wipJurisdictions[jid]
// }

export const wipList = (state) => state.wip.wipList
export const wips = (state) => state.wip.wips
export const jurisdictionTabs = (state) => state.wip.tabs

export const useWipList = () => useSelector(wipList)
export const useWips = () => useSelector(wips)
export const useWip = (jid) => useWips()[jid]
export const useJurisdictionTabs = () => useSelector(jurisdictionTabs)
