import { actions } from '../actions'
import Geohash from '@geonet/geohash'
import { toLonLat, fromLonLat } from 'ol/proj'
import { push, replace } from 'connected-react-router'

const initialState = {
    center: fromLonLat([-123,46]),
    zoom: 4
}
const DEFAULT_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const mapExtentReducer = (state=initialState, action) => {
    switch(action.type) {
        case DEFAULT_LOCATION_CHANGE:
            let newState;
            let wm;
            let z = 14;
            const q = action.payload.location.query;
            try {
                if (typeof q.z !== 'undefined') {
                    z = Number(q.z)
                    //if (z<=0) z=4 else if (z>20) z=20;
                }
            } catch(err) {
                console.log("Bad z \"", q.z, "\". Using default", z);
            }
            try {
                if (typeof q.g !== 'undefined') {
                    const ll = Geohash.decode(q.g);
                    wm = fromLonLat([ ll.lng, ll.lat ]);
                } else {
                    wm = fromLonLat([ Number(q.lng), Number(q.lat) ]);
                }
            } catch(err) {
                console.log("NO QUERY.", state, action, err.message);
            }
            if (Number.isNaN(wm[0]) ||
                Number.isNaN(wm[0]) ||
                Number.isNaN(z)) {
                    wm = initialState.center;
                    z = initialState.zoom;
            }
            newState = {
                center: wm,
                zoom: z
            }
            return newState;

        case actions.SET_MAP_CENTER:
            const newstate = {
                center: action.payload.center,
                zoom: action.payload.zoom,
            };
            return newstate;

        default:
            //console.log("Just passing this along", action);
            break;
    }
    return state;
}
