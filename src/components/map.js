import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { toLonLat, fromLonLat } from 'ol/proj'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import { myGeoServer, usngPrecision } from '../utils'
import Geohash from '@geonet/geohash'
import { push, replace } from 'connected-react-router'
import { Converter } from 'usng/usng'
const usngConverter = new Converter;

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

const MyMap = (props) => {

    const gotoXY = (coord,zoom) => {
        console.log('Map.gotoXY', coord, zoom);
        if (coord[0]==0 || coord[1]==0 || zoom==0) return;
        props.setMapCenter(coord,zoom)
    }

    const onMapClick = (e) => {
        const coord = toLonLat(e.coordinate);
        const v = e.map.getView()
        const zoom = v.getZoom();
        console.log("Home.onMapClick", coord);
/*
        setState({
            markerId: ++this.state.markerId,
            displayPoint: coord,
            displayZoom : zoom
        })
        */
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    const onMapMove = (e) => {
        const v = e.map.getView()
        const new_center_wm = v.getCenter()
        const new_zoom = v.getZoom();
//        const new_center_wgs84 = toLonLat(new_center_wm)

        if (isNaN(new_center_wm[0]) || isNaN(new_center_wm[1]) || isNaN(new_zoom))
            return;

        // Does map actually need to change?
        if (props.center[0] === new_center_wm[0]
        &&  props.center[1] === new_center_wm[1]
        &&  props.zoom === new_zoom)
            return;

        gotoXY(new_center_wm, new_zoom, true)
    }

    return (
        <Map useDefaultControls={true}
            onSingleClick={ onMapClick } onMoveEnd={ onMapMove }
            view=<View zoom={ props.zoom }
                center={ props.center }
                minZoom={ 9 } maxZoom={ 19 }
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
    center: PropTypes.array,
    zoom: PropTypes.number
}

const mapStateToProps = (state) => {
    return {
        center: state.mapExtent.center,
        zoom: state.mapExtent.zoom
    }
};
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
