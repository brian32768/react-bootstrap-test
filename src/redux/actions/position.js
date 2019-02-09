import { actions } from './action-types'

export function setMapCenter( lon, lat ) {
    console.log("actions.setMapCenter", lat, lon);
    return {
        type: actions.SET_MAP_CENTER,
        payload: {
            lon: lon,
            lat: lat,
        }
    };
}

export function setMapZoom( zoom ) {
    console.log("actions.setMapZoom", zoom);
    return {
        type: actions.SET_MAP_ZOOM,
        payload: {
            zoom: zoom
        }
    };
}
