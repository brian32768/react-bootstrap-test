import { NOT_FOUND } from 'redux-first-router'

const components = {
    HOME:     'Home',
    MAP:      'MapPage',
    TABLE:    'Table',
    PICTURES: 'Pictures',
    ABOUT:    'About',
    CONTACT:  'Contact',
    TASKS:    'Tasks',

    [NOT_FOUND]: 'NotFound'
}

export default (state = 'Home', action = {}) => {
    const newState = components[action.type] || state
    console.log("routerReducer: ", action.type, " state=", state, " newState=", newState);
    return newState
}
