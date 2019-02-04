import deepmerge from 'deepmerge'
import { uniqueId } from '../actions'

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

const reducer = (state=initialState, action) => {
    let newstate;
    switch(action.type) {
        case 'CREATE_TASK':
            newstate = { tasks: state.tasks.concat(action.payload) };
            break;
        default:
            newstate = state;
    }
    return newstate;
}

export default reducer
