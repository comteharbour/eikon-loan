export function setLoans (state, loans) {
  // TODO: vérifier s'il faut faire une deep copy de loans
  state.loans = [...loans]
}
