import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin`

export const list = async () => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions`)
  return data
}

export const listMine = async () => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions/me`)
  return data
}

export const listReleased = async () => {
  const { data } = await axios.get(`${BASE_URL}/wip/jurisdictions/released`)
  return data
}

export const getReleased = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/wip/jurisdictions/released/${wipJurisdictionId}`
  const { data } = await axios.get(url)
  return data
}

export const getById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions/${id}`)
  return data
}

export const createWip = async (jurisdictionId) => {
  const { data } = await axios.post(`${BASE_URL}/wip`)
  return data
}

export const getWipJurisdiction = async (jurisdictionId) => {
  const url = `${BASE_URL}/wip/jurisdictions/${jurisdictionId}`
  const { data } = await axios.get(url)
  return data
}

export const updateWipJurisdiction = async (wipJurisdictionId, wip) => {
  // NOTE: optional dates and times generate errors on the backend
  // if we pass a blank string, e.g. --

  // 2020-10-15 22:24:39.407 UTC [968]
  //  ERROR:  new row for relation "wip_jurisdiction_importantdate"
  // violates check constraint "wip_jurisdiction_importantdate_begin_time_check"

  // Getting around this by converting blank strings to null. But seems
  // weird cuz the backend models don't identify any contraints on these fields.
  // Talk to Drew about this. Wonder if the constraints are left over from
  // previous migrations.
  wip.importantDates.forEach(importantDate => {
    if (importantDate.beginDate === '') importantDate.beginDate = null
    if (importantDate.beginTime === '') importantDate.beginTime = null
    if (importantDate.endDate === '') importantDate.endDate = null
    if (importantDate.endTime === '') importantDate.endTime = null
  })

  wip.locations.forEach(location => {
    if (location.scheduleType !== 'description') {
      location.scheduleDescription = null
    }

    if (location.scheduleType !== 'hours') {
      location.hours = []
    }

    if (location.scheduleType !== 'continuous') {
      location.continuousOpenDate = null
      location.continuousCloseDate = null
      location.continuousOpenTime = null
      location.continuousCloseTime = null
    }
  })

  const url = `${BASE_URL}/wip/jurisdictions/${wipJurisdictionId}`
  const { data } = await axios.put(url, wip)
  return data
}

export const releaseWipJurisdiction = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/wip/jurisdictions/${wipJurisdictionId}/release`
  const { data } = await axios.put(url)
  return data
}

export const assignJurisdictions = async ({
  userId,
  jurisdictionIds,
  removedJurisdictionIds,
}) => {
  const url = `${BASE_URL}/jurisdictions/assign`;
  const body = { userId, jurisdictionIds, removedJurisdictionIds }
  const { data } = await axios.post(url, body);
  return data;
}

export const publishWipJurisdiction = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/wip/jurisdictions/${wipJurisdictionId}/publish`
  const { data } = await axios.put(url)
  return data
}
