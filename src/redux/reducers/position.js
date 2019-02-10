import { actions } from '../actions'

const initialState = {
    position: {
        lon: 0,
        lat: 0,
        zoom: 0
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_MAP_POSITION:
            return {
                position: {
                    lon: action.payload.lon,
                    lat: action.payload.lat,
                    zoom: action.payload.zoom,
                }
            }
    }
    return state;
}

export default reducer
