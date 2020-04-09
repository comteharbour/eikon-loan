import * as axios from '../axios'

export function signup ({ commit }, { firstName, lastName, email, password }) {
  return axios.signup({ firstName, lastName, email, password })
}

export function login ({ commit }, { email, password }) {
  return new Promise((resolve, reject) => {
    commit('login', email)
    resolve()
  })
}

// export function logout ({ commit }) {
//   return new Promise((resolve, reject) => {
//     window.localStorage.removeItem('token')
//     commit('logout')
//     resolve()
//   })
// }

// export function checkIfConnected ({ commit }) {
//   return new Promise((resolve, reject) => {
//     const user = window.localStorage.getItem('token')
//     if (user) {
//       login({ commit }, user)
//         .then(resolve(true))
//     } else {
//       resolve(false)
//     }
//   })
// }
