export default (state = {}, action = {}) => {
  if (action.type !== 'SWAPI_FETCHED') {
    return state
  }
  const { data, hasError = false } = action.payload
  return { data, hasError }
}
