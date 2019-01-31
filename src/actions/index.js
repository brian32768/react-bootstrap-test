let _id = 1;
export function uniqueId() {
    return _id++;
}

// This is my action creator

export function createTask({ title, description }) {
    console.log("actions.createTask", title, description);
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
//            status: 'Unstarted',
        },
    };
}
