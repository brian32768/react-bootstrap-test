import { actions, taskStatus } from './action-types'

let _id = 1;
export function uniqueId() {
    return _id++;
}

export function addTask({ title, description }) {
    console.log("actions.createTask", title, description);
    return {
        type: actions.ADD_TASK,
        payload: {
            id: uniqueId(),
            title,
            description,
            status: taskStatus.UNSTARTED,
        },
    };
}
export function changeTaskStatus({ id, status }) {
    console.log("actions.changeTaskStatus", id, status);
    return {
        type: actions.CHANGE_TASK_STATUS,
        payload: {
            id,
            status
        },
    };
}
