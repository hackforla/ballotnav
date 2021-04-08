import { useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

////////////// SIMPLE /////////////

export const auth = (state) => state.auth
export const role = (state) => ({
  role: state.auth.user?.role,
  isVolunteer: state.auth.user?.role === 'volunteer',
  isAdmin: state.auth.user?.role === 'admin',
})

export const wipList = (state) => state.wip.wipList
export const wips = (state) => state.wip.wips
export const jurisdictionTabs = (state) => state.wip.tabs

export const toaster = (state) => state.toaster
export const assignment = (state) => state.assignment

//////////// USE SELECTOR /////////

export const useAuth = () => useSelector(auth)
export const useRole = () => useSelector(role)

export const useWipList = () => useSelector(wipList)
export const useWips = () => useSelector(wips)
export const useJurisdictionTabs = () => useSelector(jurisdictionTabs)

export const useToaster = () => useSelector(toaster)
export const useAssignment = () => useSelector(assignment)

///// PARAMATERIZED USE SELECTOR ///

export const useWip = (jid) => useWips()[jid]
export const useWipListItem = (jid) => {
  return useWipList().find((wip) => wip.jurisdictionId === +jid)
}
