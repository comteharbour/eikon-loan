import * as axios from '../axios'

export function verifyMaterial (__, { materialUuid }) {
  return new Promise((resolve, reject) => {
    axios.getMaterial({ materialUuid })
      .then(response => {
        switch (response.data.status) {
          case 'error': reject('materialDoesNotExist'); break
          default: resolve(response.data)
        }
      })
      .catch(error => reject(error))
  })
}

export function loan ({ commit }, { materialUuid, quantity }) {
  return new Promise((resolve, reject) => {
    axios.loan({ materialUuid, quantity })
      .then(response => {
        // TODO: update state
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getLoans ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.getLoans()
      .then(response => {
        commit('setLoans', response.data.loans)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function giveBack ({ commit }, { loanUuid }) {
  return new Promise((resolve, reject) => {
    // TODO: update state
    axios.giveBack({ loanUuid })
    resolve()
  })
}
