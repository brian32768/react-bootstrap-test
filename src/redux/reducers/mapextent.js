import { actions } from '../actions'
import Geohash from '@geonet/geohash'
import { toLonLat, fromLonLat } from 'ol/proj'

const initialState = {
    center: fromLonLat([-123,46]),
    zoom: 4
}
const DEFAULT_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const mapExtentReducer = (state=initialState, action) => {
    switch(action.type) {
        case DEFAULT_LOCATION_CHANGE:
            let coord = []
            let wm = []
            try {
                const q = action.payload.location.query
                const ll = Geohash.decode(q.g);
                const z = Number(q.z);
                console.log("Q= ",q, " Z=",z);
                coord = [ ll.lng, ll.lat ]
                wm = fromLonLat(coord);
                console.log('NEWISH CENTER SHALL BE', coord)
                newState = {
                    center: coord,
                    zoom: z
                }
                return newState;
                
            } catch(err) {
                console.log("NO QUERY.", state, action, err.message)
                coord = toLonLat(state.mapExtent.center)
                //wm = Geohash.encode(coord[0], coord[1]);
                console.log('RESTORED CENTER SHALL BE', coord)
            }
            break;
/*
        case actions.SET_MAP_CENTER:
            const newstate = {
                center: action.payload.center,
                zoom: action.payload.zoom,
            };
            return newstate;
*/
        default:
            //console.log("Just passing this along", action);
            break;
    }
    return state;
}
