import { actions } from '../actions'

const initialState = {
    position: {
        coordinate: [0,0],
        zoom: 0
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_MAP_POSITION:
            const newstate = {
                position: {
                    coordinate: action.payload.coordinate,
                    zoom: action.payload.zoom,
                }
            };
            //console.log(state, '=>', newstate);
            return newstate;
    }
    return state;
}

export default reducer
