export const actions = {
    // Pages
    MAP: 'MAP',

    // Bookmarks
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    DELETE_BOOKMARK: 'DELETE_BOOKMARK',

    // Map
    SETCENTER: 'SETCENTER',

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
