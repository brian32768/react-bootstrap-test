import deepmerge from 'deepmerge'
import { uniqueId, actions } from '../actions'

const initialState = [
    {
        id: uniqueId(),
        title: 'Rescue the hostages from the northern raiders.',
        description: 'The store, actions, and reducers, oh my!',
        status: 'In Progress',
    },
    {
        id: uniqueId(),
        title: 'Learn to be a Master Bladesmith',
        description: 'No big deal.',
        status: 'In Progress',
    },
];

export const tasks = (state=initialState, action) => {
    console.log("tasks reducer", action, state);
    switch(action.type) {
        case actions.ADD_TASK:
            return state.tasks.concat(action.payload);
    }
    return state;
}
