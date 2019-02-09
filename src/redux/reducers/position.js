import { actions } from '../actions'

const initialState = {
    center: {
        lon: 0,
        lat: 0,
        zoom: 0
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_MAP_CENTER:
            return {
                center: {
                    lon: action.payload.lon,
                    lat: action.payload.lat,
                    zoom: state.center.zoom,
                }
            });
            break;
        case actions.SET_MAP_ZOOM:
            return {
                center: {
                    lon: state.center.lon,
                    lat: state.center.lat,
                    zoom: action.payload.zoom,
                }
            }
    }
    return state;
}

export default reducer
