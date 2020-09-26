import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/states`

export const list = async () => {
  const { data } = await axios.get(BASE_URL)
  return data
}
