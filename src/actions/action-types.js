export const actions = {
    // Havoc will ensue if this does not exist, undefined action errors
    // none of the other pages cause problems because none of them
    // generate map events I guess
    MAP:             'MAP',

    // Bookmarks
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    DELETE_BOOKMARK: 'DELETE_BOOKMARK',

    // Map
    SETMAPTITLE: 'SETMAPTITLE',
    SETMAPCENTER: 'SETMAPCENTER',
    SETDISPLAYPOINT: 'SETDISPLAYPOINT',

    // Tasks
    ADD_TASK: 'ADD_TASK',
    CHANGE_TASK_STATUS: 'CHANGE_TASK_STATUS',

    // Themes
    TOGGLE_THEME: 'TOGGLE_THEME',
};

export const taskStatus = {
    UNSTARTED: 'Unstarted',
    STARTED: 'Started',
    DONE: 'Done',
};

// FIXME this key is not going to be unique after reload
let _id = 1;
export function uniqueId() {
    return _id++;
}
