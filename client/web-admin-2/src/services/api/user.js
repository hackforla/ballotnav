import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin/user`

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/me`)
    return response.data
  } catch (err) {
    return null
  }
}

export const login = async ({ email, password }) => {
  const body = { email, password }
  try {
    const response = await axios.post(BASE_URL + '/login', body)
    await sessionStorage.setItem('token', response.data.token)
    return response.data
  } catch (err) {
    return Promise.reject(err.response.data)
  }
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  notes,
  slackName,
}) => {
  const body = { firstName, lastName, email, password, notes, slackName }
  try {
    const response = await axios.post(BASE_URL + '/register', body)
    await sessionStorage.setItem('token', response.data.token)
    return response.data
  } catch (err) {
    return Promise.reject(err.response.data)
  }
}

export const logout = async () => {
  await sessionStorage.removeItem('token')
  return null
}

// export const getAll = async () => {
//   const response = await axios.get(BASE_URL)
//   return response.user
// }
//
// export const resendConfirmationEmail = async (email) => {
//   const body = { email }
//   const response = await axios.post(BASE_URL + '/resendConfirmationEmail', body)
//   return response.data
// }
//
// export const forgotPassword = async (email) => {
//   const body = { email }
//   const response = await axios.post(BASE_URL + '/forgotPassword', body)
//   return response.data
// }
//
// export const resetPassword = async (token, password) => {
//   const body = { token, password }
//   const response = await axios.post(BASE_URL + '/resetPassword', body)
//   return response.data
// }
//
// export const confirmRegister = async (token) => {
//   const body = { token }
//   const response = await axios.post(BASE_URL + '/confirmRegister', body)
//   return response.data
// }
//
//
//
// export const logout = async () => {
//   const response = await axios.get(BASE_URL + '/logout')
//   await sessionStorage.deleteItem('token')
//   return response.data
// }
//
// // This is used to updated login table with the specified permissionName column set to value
// // i.e. is_admin, is_security_admin, is_data_entry
// export const setPermissions = async (userId, permissionName, value) => {
//   const body = { userId, permissionName, value }
//   try {
//     const response = await axios.post(BASE_URL + '/setPermissions', body)
//     return response.data
//   } catch (err) {
//     console.log(err)
//   }
// }
