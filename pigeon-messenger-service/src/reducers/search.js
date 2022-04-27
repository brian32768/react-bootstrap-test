export const search = (state = {}, action = {}) => {
    if (action.type !== 'SEARCH_FETCHED') {
        return state
    }
    const { data, hasError = false } = action.payload
    return { data, hasError }
}
