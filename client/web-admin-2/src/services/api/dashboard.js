import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin/dashboard`

export const getJurisdictions = async () => {
  const { data } = await axios.get(`${BASE_URL}/jurisdictions`)
  return data
}
