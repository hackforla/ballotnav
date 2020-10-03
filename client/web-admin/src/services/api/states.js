import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin`

export const list = async () => {
  const { data } = await axios.get(`${BASE_URL}/states`)
  return data
}

export const getById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/states/${id}`)
  return data
}
