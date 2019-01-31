const counter = (state={count:0}, action) => {
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
            console.log("Unknown action requested", action)
            return state;
    }
    return newstate;
}

export default counter
