import { actions } from './action-types'

export function setMapCenter( center, zoom ) {
    return {
        type: actions.SET_MAP_CENTER,
        payload: { center, zoom }
    };
}
