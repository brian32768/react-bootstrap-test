let _id = 1;
export function uniqueId() {
    return _id++;
}

// Here are my action creators

export function createTask({ title, description }) {
    console.log("actions.createTask", title, description);
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'Unstarted',
        },
    };
}
export function changeTaskStatus({ id, status }) {
    console.log("actions.changeTaskStatus", id, status);
    return {
        type: 'CHNAGE_TASK_STATUS',
        payload: {
            id,
            status
        },
    };
}

export function toggleTheme() {
    console.log("actions.toggleTheme");
    return {
        type: 'TOGGLE_THEME',
        payload: {
            id: uniqueId(),
        },
    };
}
