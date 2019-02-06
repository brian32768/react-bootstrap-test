/* The combinReducer rules:
    1. Must always return a valid state, even if action is unknown.
    2. Must return an initial state if state is undefined.
*/

const initialState = {
    count: 0
}

const reducer = (state=initialState, action) => {
    let count = state.count;
    let newstate;
    switch (action.type) {
        case 'INCREMENT':
            newstate = {
                count: count + 1
            };
            break;
        case 'DECREMENT':
            newstate = {
                count: count - 1
            };
            break;
        default:
            newstate = state;
    }
    return newstate;
}

export default reducer
