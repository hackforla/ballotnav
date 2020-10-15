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
