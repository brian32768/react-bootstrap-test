import { uniqueId } from '../actions'

const mockTasks = [
    {
        id: uniqueId(),
        title: 'Learn Redux',
        description: 'The store, actions, and reducers, oh my!',
        status: 'In Progress',
    },
    {
        id: uniqueId(),
        title: 'Peace on Earth',
        description: 'No big deal.',
        status: 'In Progress',
    },
];

const tasks = (state = { tasks: mockTasks }, action) => {
    switch(action.type) {
        case 'CREATE_TASK':
            console.log("reducers CREATE_TASK");
            return { tasks: state.tasks.concat(action.payload) };
    }
    console.log("Unrecognized action:", action.type, "; state not changed.");
    return state;
}

export default tasks;
