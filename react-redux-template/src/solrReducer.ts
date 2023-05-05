export default (state = {}, action = {}) => {
  if (action.type !== 'SOLR_FETCHED') {
    return state
  }
  const { data, hasError = false } = action.payload
  return { data, hasError }
}
