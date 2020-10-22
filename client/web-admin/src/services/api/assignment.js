import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin/assignment`

export const listAllJurisdictions = async () => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions`)
  return data
}

export const listAllVolunteers = async () => {
  const { data } = await axios.get(`${BASE_URL}/volunteers`);
  return data;
}

export const listMyJurisdictions = async () => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions/me`)
  return data
}

export const assignJurisdictions = async ({
  userId,
  jurisdictionIds,
  removedJurisdictionIds,
}) => {
  const { data } = await axios.post(`${BASE_URL}/jurisdictions`, {
    userId,
    jurisdictionIds,
    removedJurisdictionIds,
  })
  return data;
}
