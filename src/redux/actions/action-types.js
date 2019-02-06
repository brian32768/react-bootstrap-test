export const actions = {
    ADD_TASK: 'ADD_TASK',
    CHANGE_TASK_STATUS: 'CHANGE_TASK_STATUS',

    ADD_BOOKMARK: 'ADD_BOOKMARK',
    DELETE_BOOKMARK: 'DELETE_BOOKMARK',
    SELECT_BOOKMARK: 'SELECT_BOOKMARK',
    NEXT_BOOKMARK: 'NEXT_BOOKMARK',

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
