import * as axios from '../axios'

export function signup ({ commit }, { firstName, lastName, email, password }) {
  return axios.signup({ firstName, lastName, email, password })
}

export function login ({ commit }, { email, password }) {
  return new Promise((resolve, reject) => {
    axios.login({ email, password })
      .then(response => {
        axios.setBearer(response.data.token)
        localStorage.setItem('user-token', response.data.token)
        localStorage.setItem('user-id', response.data.id)
        commit('login', response)
        resolve(response)
      })
      .catch(error => {
        // handle error
        reject(error)
      })
  })
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-id')
    commit('logout')
    resolve()
  })
}

export function checkIfConnected ({ commit }) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('user-token')
    const userUuid = localStorage.getItem('user-id')
    if (!!token && !!userUuid) {
      axios.setBearer({ token })
      axios.getMyData({ userUuid })
        .then(response => {
          commit('login', response)
          resolve(true)
        })
        .catch(() => logout().then(() => resolve(false)))
    } else {
      resolve(false)
    }
  })
}
