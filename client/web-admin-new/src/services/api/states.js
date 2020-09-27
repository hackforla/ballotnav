import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/states`

export const list = async () => {
  // const { data } = await axios.get(BASE_URL)
  // return data
  return [{
    id: 1,
    name: 'Wisconsin',
  },{
    id: 2,
    name: 'Pennsylvania',
  },{
    id: 3,
    name: 'Florida',
  },{
    id: 4,
    name: 'Michigan',
  }]
}
