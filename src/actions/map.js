import { actions } from './action-types'

// center is an array of lon,lat numbers
// zoom is a number
export function setMapCenter(center, zoom) {
    return {
        type: actions.SETCENTER,
        payload: {
            center: center,
            zoom
        }
    };
}
