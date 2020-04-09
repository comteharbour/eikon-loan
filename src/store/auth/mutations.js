export function login (state, { userUuid, token, email, fristName, lastName }) {
  state.userUuid = userUuid
  state.token = token
  state.email = email
  state.fristName = fristName
  state.lastName = lastName
  state.isConnected = true
}

export function logout (state) {
  state.userUuid = null
  state.token = null
  state.email = null
  state.fristName = null
  state.lastName = null
  state.isConnected = false
}

// for testing purpose
// to be removed
export function toggleConnect (state) {
  state.isConnected = !state.isConnected
}
