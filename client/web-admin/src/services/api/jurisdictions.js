import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/jurisdictions`

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

const LOCATIONS = [
  {
    id: 1,
    name: 'Town Hall',
  },
  {
    id: 2,
    name: 'The Library',
  },
  {
    id: 3,
    name: 'McDonalds',
  },
]

export const listMine = async () => {
  const { data } = await axios.get(`${BASE_URL}/me`)
  return data
}

export const list = async () => {
  return JURISDICTIONS
}

export const getById = async (id) => {
  return {
    id,
    name: JURISDICTIONS.find((j) => j.id === +id)?.name,
    locations: LOCATIONS,
  }
}

// export const update = async (jurisdiction) => {
//   return {
//     updated: true,
//   }
// }
