import { NOT_FOUND } from 'redux-first-router'

// This maps a page to a new state.
const components = {
    HOME:     'Home',
    MAP:      'MapPage',
    TABLE:    'Table',
    SEARCH:   'Search',
    PICTURES: 'Pictures',
    ABOUT:    'About',
    CONTACT:  'Contact',

    [NOT_FOUND]: 'NotFound'
}

export const page = (state = 'Home', action = {}) => {
    const newState = components[action.type] || state
    if (newState !== state)
        console.log("page reducer: ", action.type, state, " --> ", newState);
    return newState
}
