//
// This is the map.
//
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setMapCenter} from '../actions'
import {Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import Position from './position'
import {Geolocation, GEOLOCATIONZOOM} from '../geolocation'
import {Map, Feature, Graticule, control, interaction, geom, layer, source} from '@map46/ol-react'
import {OpenLayersVersion} from '@map46/ol-react'
//import Popup from 'ol-ext/overlay/Popup'

import {MapProvider} from '@map46/ol-react/map-context'
import {Map as olMap, View as olView} from 'ol'
import {toStringXY, toStringHDMS} from 'ol/coordinate'
import {toLonLat, fromLonLat} from 'ol/proj'
import {defaultOverviewLayers as ovLayers} from '@map46/ol-react/map-layers'

import {wgs84} from '@map46/ol-react/constants'
import {DEFAULT_CENTER, MINZOOM, MAXZOOM, astoria_wm, workspace, myGeoServer} from '../constants'

const geolocation = new Geolocation();

import {Style, Circle, Fill, Icon, Stroke, Text} from 'ol/style'
import Collection from 'ol/collection'
import {click, platformModifierKeyOnly} from 'ol/events/condition'

// Base layers
const esriClarityUrl = 'https://clarity.maptiles.arcgis.com/arcgis/rest/services/' +
                    'World_Imagery/MapServer/tile/{z}/{y}/{x}'

/* MVT from Mapbox
// This is only needed to show a fancy mapbox vector map
import {createMapboxStreetsV6Style} from '@map46/ol-react/mapbox-streets-v6-style'
const mapbox_key = process.env.MAPBOX_KEY;
const mapboxStreetsUrl = 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/'
        + '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
const mapboxStyle = createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text);
*/

const taxlotsKey      = 'taxlotkey';
const taxlotsColumns  = [
    {dataField: 'taxlotkey',  text: 'Taxlot Key'},
    {dataField: 'account_id', text: 'Account'},
    {dataField: 'taxlot',     text: 'Taxlot'},
    {dataField: 'owner_line', text: 'Owner'},
    {dataField: 'situs_addr', text: 'Situs Address'},
]
const taxlotPopupField = 'situs_addr';

/* WFS
 To generate this WFS service URL, go into GeoServer Layer Preview,
 and in All Formats, select "WFS GeoJSON(JSONP)" then paste here and
 clip off the outputFormat and maxFeatures attributes (maxFeatures=50&outputFormat=text%2Fjavascript
*/
const taxlotsUrl = myGeoServer + '/ows?service=WFS&version=1.0.0&request=GetFeature'
    + '&typeName=' + workspace + '%3Ataxlots'
const taxlotsFormat = 'geojson'

/* VECTOR TILES
const taxlotsLayer = 'clatsop_wm%3Ataxlots'
const taxlotsUrl = myGeoServer + '/gwc/service/tms/1.0.0/'
        + taxlotsLayer
        + '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
*/
const taxlotStyle = new Style({
    fill: new Fill({color:"rgba(128,0,0,0.1)"}),
    stroke: new Stroke({color:"rgba(0,0,0,1.0)", width:1}),
})
// yellow outline, clear center lets you see what you have selected!
const selectedStyle = new Style({ // yellow
    stroke: new Stroke({color: 'rgba(255, 255, 0, 1.0)', width:2}),
    fill:   new Fill({color: 'rgba(255, 255, 0, .001)'}),
});

/* ========================================================================== */

const MyMap = ({center, zoom, setMapCenter}) => {
    const [theMap, setTheMap] = useState(new olMap({
        view: new olView({
            center: fromLonLat(center),
            zoom: zoom}),
            minZoom: MINZOOM, maxZoom: MAXZOOM,
        //controls: [],
    }));
    const theView = theMap.getView();
    const [selectCount, setSelectCount] = useState(0);
    const [rows, setRows] = useState([]) // rows in table
    const [pointer, setPointer] = useState(center);
    const [markerId, setMarkerId] = useState(1);
/*
Popups are not quite working yet -- it affects the selection of taxlots, makes it spotty

    const [popup, setPopup] = useState(new Popup());
    const [popupPosition, setPopupPosition] = useState([0,0]) // location on screen
    const [popupText, setPopupText] = useState("HERE") // text for popup
*/
    let taxlotLayer = null;

    useEffect(() => {
//        theMap.addOverlay(popup);
        const layers = theMap.getLayers();
        layers.forEach(layer => {
            if (layer.get("title") == 'Taxlots')
                taxlotLayer = layer;
        })
    }, []);

    // Returns true if the event should trigger a taxlot selection
    const myCondition = (e) => {
        switch(e.type) {
            case 'click':
                console.log('CLICK!');
                return true;
            case 'pointerdown':
            case 'pointerup':
            case 'singleclick':
            case 'wheel':
            case 'pointerdrag':
                console.log('condition:', e.type);
                return false;

            case 'pointermove':
/*
                // roll over - just show taxlot popup
                const lonlat = toLonLat(e.coordinate)
                const features = taxlotLayer.getSource().getFeaturesAtCoordinate(e.coordinate)
                if (features.length > 0) {
                    const text = features[0].get(taxlotPopupField)
                    if (text != null && text.length > 0) {
                        popup.show(e.coordinate, text);
                        return false;
                    }
                }
                popup.hide();
*/
                return false; // don't do a selection!

    //            case 'platformModifierKeyOnly':
    //                return false;
        }
        console.log("?? condition", e.type);
        return false; // pass event along I guess
    }

    const gotoLonLat = (center, zoom) => {
        console.log('MapPage.gotoLonLat', center, zoom);
        if (center[0]==0 || center[1]==0 || zoom==0) return;
        setMapCenter(center, zoom);
        theView.setCenter(fromLonLat(center));
        theView.setZoom(zoom)
    }

    const gotoGeolocation = (e) => {
        if (!geolocation.valid) {
            console.log("can't get geolocation");
            return;
        }
        console.log(geolocation)
        gotoLonLat(geolocation.coord, GEOLOCATIONZOOM);
    }

    const copyFeaturesToTable = (features) => {
        const rows = [];
        if (features.getLength()) {
            features.forEach( (feature) => {
                const attributes = {};
                // Copy the data from each feature into a list
                taxlotsColumns.forEach ( (column) => {
                    attributes[column.dataField] = feature.get(column.dataField);
                });
                rows.push(attributes)
            });
        }
        setRows(rows);
    }

    const selectedFeatures = new Collection();
    const onSelectEvent = (e) => {
        console.log("onSelectEvent", e)
        const s = selectedFeatures.getLength();
        setSelectCount(s);
/*
        if (s) {
            popup.show(e.mapBrowserEvent.coordinate, selectedFeatures.item(0).get("taxlot").trim());
        } else {
            popup.hide()
        }
*/
        copyFeaturesToTable(selectedFeatures)
        e.stopPropagation(); // this stops draw interaction
    }

    const onPointerMove = (e) => {
        const lonlat = toLonLat(e.coordinate)
        setPointer(lonlat)
        return false; // Stop event propagation
    }

    const onMapMove = (e) => {
        const newCenter = toLonLat(theView.getCenter());
        const newZoom = Math.round(theView.getZoom());
        setMapCenter(newCenter, newZoom);
        //e.stopPropagation();
        return false; // stop event propagation
    }

    const coordFormatter = (coord) => {
		return toStringXY(coord, 4);
	}

    return (
        <>
        <MapProvider map={theMap}>
        <Container>
            <Row><Col>
                <i>OpenLayers version <OpenLayersVersion/></i> &nbsp;
                <Position coord={pointer} zoom={zoom} /> &nbsp;
                Selected={selectCount}
            </Col></Row>
            <Row><Col>
                <Map onMoveEnd={onMapMove} onPointerMove={onPointerMove}
                    style={{backgroundColor:"black",width:460,height:265,position:'relative',left:15,top:5}}>

                    <layer.Tile title="ESRI Clarity" baseLayer={true} visible={false}>
                        <source.XYZ url={esriClarityUrl}/>
                    </layer.Tile>

                    {/* Alternatives for streets: conventional or MVT */}
                    <layer.Tile title="OpenStreetMap" baseLayer={true} visible={true}>
                        <source.OSM/>
                    </layer.Tile>
                    {/* MVT
                    <layer.VectorTile title="Mapbox Streets" baseLayer={true} visible={true} style={mapboxStyle} declutter={true}>
                        <source.VectorTile url={mapboxStreetsUrl}/>
                    </layer.VectorTile>

                    <layer.VectorTile title="Taxlots" declutter={true} crossOrigin="anonymous" style={taxlotStyle}>
                        <source.VectorTile url={taxlotsUrl}>
                            <interaction.Select features={selectedFeatures} style={selectedStyle} condition={click} selected={onSelectEvent}/>
                            <interaction.SelectDragBox condition={platformModifierKeyOnly} selected={onSelectEvent}/>
                        </source.VectorTile>
                    </layer.VectorTile>
                    */}

                    {/* WFS */}
                    <layer.Vector title="Taxlots" style={taxlotStyle} maxResolution={10}>
                        <source.JSON url={taxlotsUrl} loader={taxlotsFormat}>
                            <interaction.Select features={selectedFeatures} style={selectedStyle} condition={myCondition} selected={onSelectEvent}/>
                            <interaction.SelectDragBox features={selectedFeatures} style={selectedStyle} condition={platformModifierKeyOnly} selected={onSelectEvent}/>
                        </source.JSON>
                    </layer.Vector>

                    <control.GeoBookmark/>
                    <control.MousePosition  projection={wgs84} coordinateFormat={coordFormatter}/>
                </Map>
            </Col>
            <Col>
                <control.LayerSwitcher show_progress={true} collapsed={false} />
            </Col></Row>
            <Row><Col>
                {rows.length? (rows.length + ' taxlots selected') : ''}
                <BootstrapTable bootstrap4 striped condensed
                    keyField={taxlotsKey} columns={taxlotsColumns} data={rows}/>
            </Col></Row>
        </Container>
        </MapProvider>
        </>
    );
}
MyMap.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    setMapCenter: PropTypes.func,
}
const mapStateToProps = (state) => ({
    center: (state.map.lonlat == undefined)? DEFAULT_CENTER : state.map.lonlat,
    zoom:   state.map.zoom,
});
const mapDispatchToProps = {
    setMapCenter,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
