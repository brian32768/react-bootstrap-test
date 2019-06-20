import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter, setDisplayPoint } from '../actions'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import { myGeoServer, usngPrecision } from '../constants'
import Geohash from '@geonet/geohash'
import { Converter } from 'usng/usng'
const usngConverter = new Converter;
import { XMIN,YMIN, XMAX,YMAX, MINZOOM,MAXZOOM } from '../constants'

const boundingBox = [XMIN,YMIN,XMAX,YMAX]

const taxlotslayer = 'clatsop_wm%3Ataxlots'
const taxlots_url = myGeoServer + '/gwc/service/tms/1.0.0/'
        + taxlotslayer
        + '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
/*
let textMarker = {
    text: {
        text: state.markerId.toString()
    }
}
*/
//  this draws a blue 5 pointed star
const pointMarker = {
    image: {
        type: 'regularShape',
        points: 5,
        radius: 5,
        radius1: 5,
        radius2: 2,
        stroke: { color: 'blue', width: 1.5 }
    }
};

const MyMap = ({ center,zoom,setMapCenter,
                 displayPoint, setDisplayPoint }) => {

// Okay so if I were using Hooks I could keep the state data here,
// but that's not what I am about, I want to display the point
// in the page wrapping around the map container herein. So off it goes into redux...
//    const [markerId, setMarkerId] = useState(1);
//    const [displayPoint, setDisplayPoint] = useState([0,0]);
//    const [displayZoom, setDisplayZoom] = useState(0);

    const gotoLonLat = (center, zoom) => {
        try {
            setMapCenter(center, zoom);
        } catch(err) {
            console.error("Could not update map.", err)
        }
    }

    const onMapClick = (e) => {
        const point = toLonLat(e.coordinate);
        const v = e.map.getView()
        const zoom = v.getZoom();
        console.log("MyMap.onMapClick", point);
        setDisplayPoint(point, zoom);
        //setMarkerId(markerId+1);
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    const onMapMove = (e) => {
        const v = e.map.getView()
        const new_zoom = v.getZoom();

        try {
            const new_center = toLonLat(v.getCenter())
            console.log("MyMap onMapMove", new_center);
            gotoLonLat(new_center, new_zoom, true);
        } catch(err) {
            console.error("Could not update map.", err)
        }
    }

    console.log("map render", center, fromLonLat(center));

    return (
        <Map useDefaultControls={true}
            onSingleClick={ onMapClick } onMoveEnd={ onMapMove }
            view=<View zoom={ zoom }
                center={ fromLonLat(center) } extent={boundingBox}
                minZoom={ MINZOOM } maxZoom={ MAXZOOM }
                />
        >
            <control.MousePosition
                target="mouseposition"
            />
            <layer.Tile name="OpenStreetMap" source="OSM"/>
            <layer.VectorTile source="MVT" url={ taxlots_url } />
            <layer.Vector
                style={ pointMarker }
                opacity={ 1 } >
                <interaction.Draw type="Point" />
            </layer.Vector>
        </Map>
    );
}
Map.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number
}
const mapStateToProps = (state) => { console.log("state=",state); return ({
    center: state.map.center,
    zoom: state.map.zoom,
    displayPoint: state.map.displayPoint,
    displayPoint: state.map.displayPoint,
})};
const mapDispatchToProps = {
    setMapCenter,
    setDisplayPoint,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
