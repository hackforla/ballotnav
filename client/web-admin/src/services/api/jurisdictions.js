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
