import axios from 'axios'

export function verifyMaterial (__, { materialUuid }) {
  return new Promise((resolve, reject) => {
    axios.get(`https://loan-eikon-it.frogfish.dev/api/materials/uuid/${materialUuid}`)
      .then(response => {
        switch (response.data.status) {
          case 'error': reject('materialDoesNotExist'); break
          default: resolve(response.data)
        }
      })
      .catch(error => reject(error))
  })
}

export function loanMaterial ({ commit }, { materialUuid, quantity }) {
  return new Promise((resolve, reject) => {
    axios.put(`https://loan-eikon-it.frogfish.dev/api/loans/${materialUuid}`)
      .then(response => {
        console.log(response)
        resolve()
        // switch (response.data.status) {
        //   case 'error': reject('materialDoesNotExist'); break
        //   default: resolve(response.data)
        // }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export function returnMaterial ({ commit }, { loanId }) {
  return new Promise((resolve, reject) => {
    console.log('return', loanId)
    commit('returnMaterial', { loanId })
    resolve()
  })
}
