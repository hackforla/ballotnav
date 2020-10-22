import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin/wip/jurisdictions`

export const getJurisdiction = async (jurisdictionId) => {
  const url = `${BASE_URL}/${jurisdictionId}`
  const { data } = await axios.get(url)
  return data
}

export const updateJurisdiction = async (wipJurisdictionId, wip) => {
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

  const url = `${BASE_URL}/${wipJurisdictionId}`
  const { data } = await axios.put(url, wip)
  return data
}

export const releaseJurisdiction = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/${wipJurisdictionId}/release`
  const { data } = await axios.put(url)
  return data
}

export const listReleasedJurisdictions = async () => {
  const { data } = await axios.get(`${BASE_URL}/released`)
  return data
}

export const getReleasedJurisdiction = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/released/${wipJurisdictionId}`
  const { data } = await axios.get(url)
  return data
}

export const publishJurisdiction = async (wipJurisdictionId) => {
  const url = `${BASE_URL}/${wipJurisdictionId}/publish`
  const { data } = await axios.put(url)
  return data
}
