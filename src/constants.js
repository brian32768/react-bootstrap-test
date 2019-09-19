// These are constants for use in the Clatsop county area.
import {fromLonLat} from 'ol/proj'

export const myArcGISServer = "https://delta.co.clatsop.or.us/server/rest/services";

export const myGeoServer = "https://geoserver.wildsong.biz/geoserver";
export const workspace = "clatsop";
export const ASTORIA_LL = [-123.823,46.1847];
export const ASTORIA_WM = fromLonLat(ASTORIA_LL);

// Limits for Clatsop County
export const MINZOOM =  8   // entire county will be visible at this level
export const MAXZOOM = 20
export const XMIN = -124.2
export const YMIN =  45.75
export const XMAX = -123.3
export const YMAX =  46.3
export const DEFAULT_CENTER = ASTORIA_LL;
 // center of extent [ XMIN + (XMAX-XMIN)/2, YMIN + (YMAX-YMIN)/2 ]
