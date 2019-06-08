import { actions } from '../actions'
import Geohash from '@geonet/geohash'
import { toLonLat, fromLonLat } from 'ol/proj'

const initialState = {
    mapExtent: {
        center: fromLonLat([-123,46]),
        zoom: 0
    }
}
const DEFAULT_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const mapextentReducer = (state=initialState, action) => {
    switch(action.type) {
        case DEFAULT_LOCATION_CHANGE:
            let q = {}
            let coord = []
            let wm = []
            try {
                const z = Number(q.z);
                //console.log("Q= ",q);
                const ll = Geohash.decode(q.g);
                coord = [ ll.lng, ll.lat ]
                wm = fromLonLat(coord);
                console.log('NEWISH CENTER SHALL BE', coord)
            } catch(err) {
                console.log("NO QUERY.", state, action, err.message)
                coord = toLonLat(state.mapExtent.center)
                //wm = Geohash.encode(coord[0], coord[1]);
                console.log('RESTORED CENTER SHALL BE', coord)
            }
            break;

        case actions.SET_MAP_CENTER:
            const newstate = {
                mapExtent: {
                    center: action.payload.center,
                    zoom: action.payload.zoom,
                }
            };
            return newstate;
        default:
            //console.log("Just passing this along", action);
            break;
    }
    return state;
}
