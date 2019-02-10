import { actions } from './action-types'

export function setMapPosition( coordinate, zoom ) {
    //console.log("actions.setMapPosition", coordinate, zoom);
    return {
        type: actions.SET_MAP_POSITION,
        payload: { coordinate, zoom }
    };
}
