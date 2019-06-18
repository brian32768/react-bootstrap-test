import { actions } from '../actions'
import Geohash from '@geonet/geohash'
import { toLonLat, fromLonLat } from 'ol/proj'

const initialState = {
    center: fromLonLat([-123,46]),
    zoom: 4
}

function getMapQuery(query) {
    // Unpack my query object into an object that I can understand.
    // In real life, I'd convert the geohash from query to center coord here.
    const ll = Geohash.decode(query.g)
    const coord = fromLonLat(ll)
    return {
        center: coord,
        zoom:   query.z
    }
}
export function getGeohash(ll) {
    return Geohash.encode(ll[0], ll[1], 7) // 7 digits=about 150m
}
export function setMapQuery(center, zoom) {
    // Pack the reasonably named state settings into a compact querystring format
    const query = {}
    // In real life, I'd convert center coord to geohash here.
    if (center[0] && center[1])
        query["g"] = getGeohash(toLonLat(center));
    if (typeof zoom !== 'undefined' && zoom) query["z"] = zoom.toString()
    return query
}

export const mapReducer = (state=initialState, action={}) => {
    switch(action.type) {
        case actions.MAP:
    //          console.log("map reducer: MAP action", action, " state=", state);
            try {
                console.log("map reducer: Loading state from query", action.meta.query);
                const newState = getMapQuery(action.meta.query)
                console.log("map reducer: MAP", state, " ==>", newState);
                return newState;
            } catch(err) {
                console.log("map reducer: No values to update right now.");
            }

        case actions.SETCENTER: {
            const newState = action.payload
            console.log("map reducer: SETCENTER", state, " =>", newState);
            return newState;
        }
    }
    return state
}
