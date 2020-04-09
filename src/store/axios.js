import axios from 'axios'

const BASE_URL = 'https://loan-eikon-it.frogfish.dev'
const LOGIN_URL = BASE_URL + '/login'
const LOAN_URL = BASE_URL + '/api/loans'
const USER_URL = BASE_URL + '/api/users'
const MATERIAL_URL = BASE_URL + '/api/materials'

function buildData (object) {
  const data = new FormData()
  for (const [key, value] of Object.entries(object)) {
    data.append(key, value)
  }
  return data
}

export function signup ({ firstName, lastName, email, password }) {
  const data = buildData({
    firstName,
    lastName,
    email,
    password
  })
  return axios.post(USER_URL, data)
}

export function login ({ email, password }) {
  const data = buildData({
    email,
    password
  })
  return axios.post(LOGIN_URL, data)
}

export function setBearer ({ token }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function getMyData ({ userUuid }) {
  return axios.get(USER_URL + '/' + userUuid)
}

export function getMaterial ({ materialUuid }) {
  return axios.get(MATERIAL_URL + '/uuid/' + materialUuid)
}

export function loan ({ materialUuid, quantity }) {
  const data = buildData({
    materialUuid,
    quantity
  })
  return axios.post(LOAN_URL, data)
}

// possible de demander les emprunts d'un utilisateur ?
export function getLoans () {
  return axios.get(LOAN_URL)
}

export function giveBack ({ loanUuid }) {
  const data = buildData({
    status: 'returned'
  })
  return axios.patch(LOAN_URL + '/' + loanUuid, data)
}
