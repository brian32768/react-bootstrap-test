import { actions } from '../actions'
import { fromLonLat } from 'ol/proj'

const initialState = {
    mapExtent: {
        center: fromLonLat([-123,46]),
        zoom: 0
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_MAP_CENTER:
            const newstate = {
                mapExtent: {
                    center: action.payload.center,
                    zoom: action.payload.zoom,
                }
            };
            return newstate;
    }
    return state;
}

export default reducer
