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
