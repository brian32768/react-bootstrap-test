import { actions } from './action-types'

export function setMapCenter(center, zoom) {
    return {
        type: actions.SETCENTER,
        payload: { center, zoom }
    };
}
