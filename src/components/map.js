//
// This is the map.
//
import React, {useState, useEffect, useRef} from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setMapCenter} from '../actions'
import {Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem} from 'reactstrap'; // eslint-disable-line no-unused-vars
import Slider, {Range} from 'rc-slider'; // eslint-disable-line no-unused-vars
import 'rc-slider/assets/index.css'
import Position from './position'; // eslint-disable-line no-unused-vars
import {Geolocation, GEOLOCATIONZOOM} from '../geolocation'
import {Map, Feature, Graticule, control, interaction, geom, layer, source} from '@map46/ol-react'; // eslint-disable-line no-unused-vars
import {OpenLayersVersion} from '@map46/ol-react'; // eslint-disable-line no-unused-vars
//import Popup from 'ol-ext/overlay/Popup'

import BootstrapTable from 'react-bootstrap-table-next'; // eslint-disable-line no-unused-vars
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit'

import {MapProvider} from '@map46/ol-react/map-context'; // eslint-disable-line no-unused-vars
import {CollectionProvider} from '@map46/ol-react/collection-context'; // eslint-disable-line no-unused-vars
import {Map as olMap, View as olView, Collection} from 'ol'
import {toStringXY} from 'ol/coordinate'
import {toLonLat, fromLonLat} from 'ol/proj'

import {WGS84, WM} from '@map46/ol-react/constants'
import {DEFAULT_CENTER, MINZOOM, MAXZOOM, workspace, myGeoServer, myArcGISServer, ASTORIA_WM} from '../constants'

const geolocation = new Geolocation();

import {Style, Circle, Fill, Icon, Stroke, Text} from 'ol/style'
import {click, platformModifierKeyOnly} from 'ol/events/condition'
import GeoJSON from 'ol/format/GeoJSON'

/* MVT from Mapbox
// This is only needed to show a fancy mapbox vector map
import {createMapboxStreetsV6Style} from '@map46/ol-react/mapbox-streets-v6-style'
const mapbox_key = process.env.MAPBOX_KEY;
const mapboxStreetsUrl = 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/'
        + '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
const mapboxStyle = createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text);
*/


/* WFS
 To generate this WFS service URL, go into GeoServer Layer Preview,
 and in All Formats, select "WFS GeoJSON(JSONP)" then paste here and
 clip off the outputFormat and maxFeatures attributes (maxFeatures=50&outputFormat=text%2Fjavascript
const taxlotUrl = myGeoServer + '/ows?service=WFS&version=1.0.0&request=GetFeature'
    + '&typeName=' + workspace + '%3Ataxlots'
const taxlotFormat = 'geojson'
const taxlotKey      = 'taxlotkey';
const taxlotColumns  = [
{dataField: 'taxlotkey',  text: 'Taxlot Key'},
{dataField: 'account_id', text: 'Account'},
{dataField: 'taxlot',     text: 'Taxlot'},
{dataField: 'owner_line', text: 'Owner'},
{dataField: 'situs_addr', text: 'Situs Address'},
]
const taxlotPopupField = 'situs_addr';
*/

/* ArcGIS FeatureServer */
const taxlotUrl = myArcGISServer + '/Taxlots/FeatureServer/1'
const taxlotFormat = 'esrijson'
const taxlotKey      = 'OBJECTID';
const taxlotColumns  = [
    {dataField: 'ACCOUNT_ID', text: 'Account', sort: true,   formatter: cell => {return (<a href="">{cell}</a>)}},
    {dataField: 'TAXLOTKEY',  text: 'Taxlot Key', sort: true},
    {dataField: 'TAXMAPNUM',  text: 'Tax Map', sort: true,   formatter: cell => {return (<a href="">{cell}</a>)}},
    {dataField: 'Taxlot',     text: 'Taxlot', sort: true},
    {dataField: 'TAXCODE',    text: 'Tax Code', sort: true},
    {dataField: 'OWNER_LINE', text: 'Owner', sort: true},
    {dataField: 'OWNER_LL_1', text: 'Owner 1', sort: true},
    {dataField: 'OWNER_LL_2', text: 'Owner 2', sort: true},
    {dataField: 'SITUS_ADDR', text: 'Situs Address', sort: true},
    {dataField: 'SITUS_CITY', text: 'Situs City', sort: true},
    {dataField: 'STREET_ADD', text: 'Mail Address', sort: true},
    {dataField: 'PO_BOX',     text: 'PO Box', sort: true},
    {dataField: 'CITY',       text: 'City', sort: true},
    {dataField: 'STATE',      text: 'State', sort: true},
    {dataField: 'ZIP_CODE',   text: 'Zip', sort: true},
]
const taxlotPopupField = 'situs_addr';

/* VECTOR TILES
const taxlotLayer = 'clatsop_wm%3Ataxlots'
const taxlotUrl = myGeoServer + '/gwc/service/tms/1.0.0/'
        + taxlotLayer
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

// FIXME MOVE THIS COMPONENT TO ITS OWN FILE!!!
// FIXME I think it would be cool to hide columns that are empty here.

import Buffer from '@turf/buffer';


const {ExportCSVButton} = CSVExport;

const transformfn = (coordinates) => {
    for (let i = 0; i < coordinates.length; i+=2) {
        coordinates[i]   += ASTORIA_WM[0];
        coordinates[i+1] += ASTORIA_WM[1];
    }
    return coordinates
}
const multipointStyle = new Style({
    image: new Circle({
        radius: 10,
        fill: new Fill({color: 'rgba(0,0,255, 0.8)'}),
        stroke: new Stroke({color: 'red', width: 3})
    })
});
const lineStyle = new Style({
    stroke: new Stroke({color: 'rgba(255, 255, 0, 1)', width: 3})
});
const polyStyle = new Style({
    stroke: new Stroke({color: 'rgba(0, 0, 0, 1)', width: 4}),
    fill: new Fill({color: 'rgba(255, 0, 0, .250)'}),
});

const TaxlotTable = ({rows, bufferSelection}) => {

    return (rows.length>0)? (
        <>
        {rows.length>1? (rows.length + ' taxlots selected') : ''}
        <br />

        <ToolkitProvider
            keyField={taxlotKey}
            data={rows} columns={taxlotColumns}
            exportCSV
        >
        {
            props => (
                <div>
                    <Button onClick={bufferSelection}>Buffer</Button>
                    <ExportCSVButton {...props.csvProps}>CSV Export</ExportCSVButton>
                    <BootstrapTable  {...props.baseProps} />
                </div>
            )
        }
        </ToolkitProvider>
        </>
    ) : (
        <>
        </>
    );
    //bootstrap4 striped condensed
    //keyField={taxlotKey} columns={taxlotColumns} data={rows}/>
}

/* ========================================================================== */

const MyMap = ({center, zoom, setMapCenter}) => {
    const [mapLayers] = useState(new Collection());
    const [theMap] = useState(new olMap({
        view: new olView({
            center: fromLonLat(center), zoom: zoom, minZoom: MINZOOM, maxZoom: MAXZOOM,
        }),
        layers: mapLayers,
        //controls: [],
    }));
    const theView = theMap.getView();
    const [selectCount, setSelectCount] = useState(0);
    const [rows, setRows] = useState([]) // rows in table
    const [pointer, setPointer] = useState(center);
/*
Popups are not quite working yet -- it affects the selection of taxlots, makes it spotty

    const [popup, setPopup] = useState(new Popup());
    const [popupPosition, setPopupPosition] = useState([0,0]) // location on screen
    const [popupText, setPopupText] = useState("HERE") // text for popup
*/
    let taxlotLayer = useRef(null);
    let bufferLayer = useRef(null);
    const bufferFeatures = new Collection();

    useEffect(() => {
//        theMap.addOverlay(popup);
        mapLayers.forEach(layer => {
            if (layer.get("title") == 'Taxlots')
                taxlotLayer.current = layer;
            if (layer.get("title") == 'Buffer')
                bufferLayer.current = layer;
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
                const geom = feature.getGeometry();
                const format = new GeoJSON({
                    geometry: 'geometry',
                    dataProjection: WGS84,
                    featureProjection: WM,
                });
                // Copy the data from each feature into a list
//                const geojson = format.writeFeature(geom);
                const f = feature
                const geojson = format.writeFeatureObject(f);
                console.log("geojson:", geojson);
                taxlotColumns.forEach ( (column) => {
                    attributes[column.dataField] = feature.get(column.dataField);
                });
                attributes['geojson'] = geojson
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

    const bufferSelection = (e) => {

        // convert the feature(s) selected into GeoJSON (and transform into WGS84)

        const geojson =  rows[0].geojson;
        console.log("Buffer this!", geojson, bufferLayer.current);

        const turfBuffered = Buffer(geojson, 100, {units: 'feet'});
        console.log("buffered=", turfBuffered);

        const format = new GeoJSON({
            geometry: 'geometry',
            dataProjection: WGS84,
            featureProjection: WM,
        });

        // convert turf shape into OL Shapes
        const b = format.readFeature(turfBuffered);

        // add the buffered features to the display feature class
        bufferLayer.current.getSource().addFeature(b);

        // expand the selection to include all the taxlots that are touching the new multipolygon
        return;
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
                    <CollectionProvider collection={mapLayers}>
                        {/* Alternatives for streets: conventional or MVT */}
                        <layer.Tile title="OpenStreetMap" baseLayer={true} visible={true}>
                            <source.OSM/>
                        </layer.Tile>
                        {/* MVT
                            <layer.Tile title="ESRI Clarity" baseLayer={true} visible={false}>
                            <source.XYZ url={esriClarityUrl}/>
                            </layer.Tile>

                        <layer.VectorTile title="Mapbox Streets" baseLayer={true} visible={true} style={mapboxStyle} declutter={true}>
                            <source.VectorTile url={mapboxStreetsUrl}/>
                        </layer.VectorTile>

                        <layer.VectorTile title="Taxlots" declutter={true} crossOrigin="anonymous" style={taxlotStyle}>
                            <source.VectorTile url={taxlotUrl}>
                                <interaction.Select features={selectedFeatures} style={selectedStyle} condition={click} selected={onSelectEvent}/>
                                <interaction.SelectDragBox condition={platformModifierKeyOnly} selected={onSelectEvent}/>
                            </source.VectorTile>
                        </layer.VectorTile>
                        */}

                        <layer.Vector title="Taxlots" style={taxlotStyle} maxResolution={10}>
                            <source.JSON url={taxlotUrl} loader={taxlotFormat}>
                                <interaction.Select features={selectedFeatures} style={selectedStyle} condition={myCondition} selected={onSelectEvent}/>
                                <interaction.SelectDragBox features={selectedFeatures} style={selectedStyle} condition={platformModifierKeyOnly} selected={onSelectEvent}/>
                            </source.JSON>
                        </layer.Vector>

                        <layer.Vector title="Buffer" opacity={1}>
                            <source.Vector features={bufferFeatures}>
                                <Feature id="P2" style={polyStyle}>
                                    <geom.Polygon transform={transformfn}>
                                        {[
                                            [[-3500, -2000], [3500, -2000], [0, 4000], [-3500, -2000]],
                                            [[0, -1000], [1000, 1000], [-1000, 1000], [0, -1000]],
                                        ]}
                                    </geom.Polygon>
                                </Feature>
                                <Feature id="MP3" style={multipointStyle}>
                                    <geom.MultiPoint transform={transformfn}>
                                        { [[-6000, -4000], [6000, -3000], [0, 6400]] }
                                    </geom.MultiPoint>
                                </Feature>
                            </source.Vector>
                        </layer.Vector>
                    </CollectionProvider>

                    <control.GeoBookmark/>
                    <control.MousePosition  projection={WGS84} coordinateFormat={coordFormatter}/>
                </Map>
            </Col>
            <Col>
                <control.LayerSwitcher show_progress={true} collapsed={false} />
            </Col></Row>
            <Row><Col>
                <TaxlotTable rows={rows} bufferSelection={bufferSelection}/>
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
