import { actions } from './action-types'

export function setMapCenter(lonlat, zoom) {
    return {
        type: actions.SETCENTER,
        payload: {
            lonlat: lonlat,
            zoom
        }
    };
}
