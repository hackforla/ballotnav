import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin`

export const listInstances = async (modelPath) => {
  const { data } = await axios.get(`${BASE_URL}/instances/${modelPath}`)
  return data
}

export const getInstance = async (instancePath) => {
  return null
}
