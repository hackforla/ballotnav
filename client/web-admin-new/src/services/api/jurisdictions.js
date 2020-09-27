// import axios from 'axios'
//
// const BASE_URL = `${process.env.REACT_APP_API_URL}/states`

export const list = async () => {
  return [{
    id: 1,
    name: 'Jurisdiction 1'
  }, {
    id: 2,
    name: 'Jurisdiction 2'
  }, {
    id: 3,
    name: 'Jurisdiction 3'
  }]
}

export const getById = async id => {
  return {
    id,
    name: `Jurisdiction ${id}`,
    locations: [{
      id: 1,
      name: 'Location 1'
    }, {
      id: 2,
      name: 'Location 2'
    }, {
      id: 3,
      name: 'Location 3'
    }]
  }
}

export const update = async jurisdiction => {
  return {
    updated: true
  }
}
