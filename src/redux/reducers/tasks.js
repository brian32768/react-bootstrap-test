import deepmerge from 'deepmerge'
import { uniqueId, actions } from '../actions'

const initialState = {
    tasks: [
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
    ]
};

export const tasksReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.ADD_TASK:
            return { tasks: state.tasks.concat(action.payload) };
    }
    return state;
}
