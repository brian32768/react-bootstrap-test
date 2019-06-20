import { NOT_FOUND } from 'redux-first-router'

const components = {
    HOME:     'Home',
    MAP:      'MapPage',
    TABLE:    'Table',
    SWAPI:    'Swapi',
    PICTURES: 'Pictures',
    ABOUT:    'About',
    CONTACT:  'Contact',
    TASKS:    'Tasks',

    [NOT_FOUND]: 'NotFound'
}

export const page = (state = 'Home', action = {}) => {
    const newState = components[action.type] || state
    console.log("page reducer: ", action.type, " state=", state, " newState=", newState);
    return newState
}
