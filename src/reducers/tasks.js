const mockTasks = [
    {
        id: 1,
        title: 'Learn Redux',
        description: 'The store, actions, and reducers, oh my!',
        status: 'In Progress',
    },
    {
        id: 2,
        title: 'Peace on Earth',
        description: 'No big deal.',
        status: 'In Progress',
    },
];

const tasks = (state = { tasks: mockTasks }, action) => {
    switch(action) {
        case 'CREATE_TASK':
            return { tasks: state.tasks.concat(action.payload) };
    }
    // Default, state is unchanged
    return state;
}

export default tasks;
