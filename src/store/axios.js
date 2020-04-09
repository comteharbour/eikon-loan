import axios from 'axios'

export const BASE_URL = 'https://loan-eikon-it.frogfish.dev/api/'
export const LOGIN_URL = BASE_URL + 'login/'
export const USER_URL = BASE_URL + 'user/'
export const MATERIAL_URL = BASE_URL + 'material/'

export function signup ({ firstName, lastName, email, password }) {
  const data = {
    firstName,
    lastName,
    username: email,
    password
  }
  return axios.post(USER_URL, data)
}

export function login ({ email, password }) {
  const data = {
    email,
    password
  }
  return axios.post(LOGIN_URL, data)
}

export function getMyData ({ userUuid }) {
  return axios.get(USER_URL + userUuid)
}
