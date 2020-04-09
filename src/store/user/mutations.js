export function logout (state) {
  state.email = null
  state.isConnected = false
}

export function signup (state, email) {
  state.email = email
  state.isConnected = true
}

export function login (state, email) {
  state.email = email
  state.isConnected = true
}

export function loanMaterial (state, { materialId, quantity }) {
  const loan = {
    loanId: Math.random(),
    materialId,
    quantity,
    loanDate: Date.now(),
    status: 'pending'
  }
  state.loans.push(loan)
}

export function returnMaterial (state, { loanId }) {
  const loanIndex = state.loans.findIndex(loan => loan.loanId === loanId)
  const newLoan = {
    ...state.loans[loanIndex],
    status: 'returned',
    returnDate: Date.now()
  }
  state.loans.splice(loanIndex, 1, newLoan)
}
