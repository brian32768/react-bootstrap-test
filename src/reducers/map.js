import { actions } from '../actions'
import Geohash from '@geonet/geohash'
import { toLonLat, fromLonLat } from 'ol/proj'

const DEFAULT_CENTER = [-123.5,46.3]

const initialState = {
    center: DEFAULT_CENTER,
    zoom: 4
}

// Queries that I can understand include
//   g=Geohash
//   z=ZoomLevel
// Someday I might offer more options:
//   lat=LAT&lng=LONG
//   layers=SOMEKINDOFLAYERHASH

function getMapQuery(query) {
    // Unpack my query object into an object that I can understand.
    // In real life, I'd convert the geohash from query to center coord here.
    const ll = Geohash.decode(query.g)
    return {
        center: [ll.lng, ll.lat],
        zoom:   Number(query.z)
    }
}
export function getGeohash(ll) {
    return Geohash.encode(ll[0], ll[1], 8) // 7 digits=about 150m
}
export function setMapQuery(lonlat, zoom) {
    // Pack the reasonably named state settings into a compact querystring format
    const query = {}
    if (lonlat[0] && lonlat[1])
        query["g"] = getGeohash(lonlat);
    if (typeof zoom !== 'undefined' && zoom)
        query["z"] = zoom.toString();
    return query
}

export const map = (state=initialState, action={}) => {
    //console.log("map reducer", action, state);
    switch(action.type) {
        case actions.MAP:
            //console.log("map reducer: MAP action", action, " state=", state);
            try {
                console.log("map reducer: Loading state from query", action.meta.query);
                const newState = getMapQuery(action.meta.query)
                console.log("map reducer: MAP", state, " ==>", newState);
                return newState;
            } catch(err) {
                console.log("map reducer: No values to update right now.");
            }
            break;

        case actions.SETCENTER: {
            const newState = action.payload
            console.log("map reducer: SETCENTER", state, " =>", newState);
            return newState;
        }
    }
    return state
}
