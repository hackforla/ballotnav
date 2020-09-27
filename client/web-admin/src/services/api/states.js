// import axios from 'axios'
//
// const BASE_URL = `${process.env.REACT_APP_API_URL}/states`

const STATES = [
  {
    id: 1,
    name: 'Wisconsin',
  },
  {
    id: 2,
    name: 'Pennsylvania',
  },
  {
    id: 3,
    name: 'Florida',
  },
  {
    id: 4,
    name: 'Michigan',
  },
]

const JURISDICTIONS = [
  {
    id: 1,
    name: 'Geneva County',
  },
  {
    id: 2,
    name: 'Lee County',
  },
  {
    id: 3,
    name: 'Monroe County',
  },
]

export const list = async () => {
  // const { data } = await axios.get(BASE_URL)
  // return data
  return STATES
}

export const getById = async (id) => {
  return {
    id,
    name: STATES.find((s) => s.id === +id)?.name,
    jurisdictions: JURISDICTIONS,
  }
}
