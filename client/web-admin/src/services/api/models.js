// import axios from 'axios'
//
// const BASE_URL = `${process.env.REACT_APP_API_URL}/models`

export const listInstances = async (modelName) => {
  return Array.from({ length: 10 }).map((_, idx) => ({
    id: idx,
    name: `${modelName} instance ${idx}`
  }))
}
