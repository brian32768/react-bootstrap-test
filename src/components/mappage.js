//
// This is the complete map page with a map and all the decorations and controls around it.
//
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setMapCenter} from '../actions'
import {Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import SpecialDay from './specialday'
import Position from './position'
import {Geolocation, GEOLOCATIONZOOM} from '../geolocation'
import {Map, Feature, Graticule, control, interaction, geom, layer, source} from '@map46/ol-react'
import {OpenLayersVersion} from '@map46/ol-react'
import Popup from 'ol-ext/overlay/Popup'
import {DataLoader} from '@map46/ol-react/source/dataloaders'

import {MapProvider} from '@map46/ol-react/map-context'
import {Map as olMap, View as olView} from 'ol'
import {toLonLat, fromLonLat} from 'ol/proj'
import {defaultOverviewLayers as ovLayers} from '@map46/ol-react/map-layers'

import {wgs84} from '@map46/ol-react/constants'
import {DEFAULT_CENTER, MINZOOM, astoria_wm, workspace, myGeoServer} from '../constants'

const geolocation = new Geolocation();

import stylefunction from 'ol-mapbox-style/stylefunction'
import {Style, Circle, Fill, Icon, Stroke, Text} from 'ol/style'
import {Collection} from 'ol'
import {click, platformModifierKeyOnly} from 'ol/events/condition'

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

const MapPage = ({theme, center, zoom, bookmarks}) => {
    const [theMap, setTheMap] = useState(new olMap({
        view: new olView({
            center: fromLonLat(center),
            zoom: zoom}),
        //controls: [],
    }));
    const theView = theMap.getView();
    const [selectCount, setSelectCount] = useState(0);
    const [rows, setRows] = useState([]) // rows in table
    const [markerId, setMarkerId] = useState( 1 );

    const [popup, setPopup] = useState(new Popup());
    const [popupPosition, setPopupPosition] = useState([0,0]) // location on screen
    const [popupText, setPopupText] = useState("HERE") // text for popup

    let taxlotLayer = null;

    useEffect(() => {
        theMap.addOverlay(popup);

        const layers = theMap.getLayers();
        layers.forEach(layer => {
            if (layer.get("title") == 'Taxlots')
                taxlotLayer = layer;
        })
    }, []);

    // IMPROVEMENT
    // https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html
    // I need to look at this code to support adding AND removing features
    // in the current selection set.

    const myCondition = (e) => {
        switch(e.type) {
            case 'click':
                return true;

            case 'pointermove':
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
                return false; // don't do a selection!

    //            case 'platformModifierKeyOnly':
    //                return false;
        }
        console.log("mystery condition", e);
        return false; // pass event along I guess
    }

    const gotoLonLat = (center, zoom) => {
        console.log('MapPage.gotoLonLat', center, zoom);
        if (center[0]==0 || center[1]==0 || zoom==0) return;
        setMapCenter(center, zoom);
        theView.setCenter(fromLonLat(center));
        theView.setZoom(zoom)
    }

    const gotoBookmark = (e) => {
        const bookmarkId = e.target.name;
        const bookmark = bookmarks[bookmarkId]  // Bookmarks are stored in WGS84
        gotoLonLat(bookmark.location, bookmark.zoom);
    }

    const gotoGeolocation = (e) => {
        if (!geolocation.valid) {
            console.log("can't get geolocation");
            return;
        }
        console.log(geolocation)
        gotoLonLat(geolocation.coord, GEOLOCATIONZOOM);
    }

/*
    // Show a list of bookmarks
    const hash = bookmarks;
    const keys = Object.keys(hash);
    const list = keys.map(k => [k, hash[k].title]);
*/

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
        if (s) {
            popup.show(e.mapBrowserEvent.coordinate, selectedFeatures.item(0).get("taxlot").trim());
        } else {
            popup.hide()
        }
        copyFeaturesToTable(selectedFeatures)
        e.stopPropagation(); // this stops draw interaction
    }

    const onMapEvent = (mapEvent) => {
        const newCenter = toLonLat(theView.getCenter());
        const newZoom = Math.round(theView.getZoom());
        switch (mapEvent.type) {
        case "moveend":
            setMapCenter(newCenter, newZoom);
            break;
        default:
            console.log("Random other map event", mapEvent, newCenter, newZoom);
            break;
        }
        mapEvent.stopPropagation();
    }

    return (
        <>
            <MapProvider map={theMap}>
            <Container>
                <Row>
                    <SpecialDay /> &nbsp;
                    <i>OpenLayers version <OpenLayersVersion/></i>
                </Row>
                <Row>
                    Position coord={center} zoom={zoom}
                    Selected = {selectCount}
                </Row>
                <Row>
                    <div className="sliders">
                        Range slider test
                        <Range />
                    </div>
                </Row>
                <Row><Col>
                    <Map center={center} zoom={zoom} animate={true}
                        onPointerMove={(e) => {setPointer(e.coordinate);}}
                        onMoveEnd={onMapEvent}
                        style={{backgroundColor:"black",width:460,height:265,position:'relative',left:15,top:5}}>

                        {/* MVT
                        <layer.VectorTile title="Mapbox Streets" style={mapboxStyle} declutter={true}>
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
                        <layer.Tile title="OpenStreetMap"><source.OSM/></layer.Tile>
                        <layer.Vector title="Taxlots" style={taxlotStyle} maxResolution={10}>
                            <source.JSON url={taxlotsUrl} loader={taxlotsFormat}>
                                <interaction.Select features={selectedFeatures} style={selectedStyle} condition={myCondition} selected={onSelectEvent}/>
                                <interaction.SelectDragBox features={selectedFeatures} style={selectedStyle} condition={platformModifierKeyOnly} selected={onSelectEvent}/>
                            </source.JSON>
                        </layer.Vector>

                        <control.GeoBookmark/>
                        <control.MousePosition projection={wgs84}/>
                    </Map>
{/*
                </Col><Col>
                        <ListGroup>
                    {list.map(item =>
                        <ListGroupItem tag="button" key={item[0]} name={item[0]}
                        onClick={gotoBookmark}
                        action>{item[0]} {item[1]}</ListGroupItem>
                    )}
                    </ListGroup>
*/}
                </Col>
                </Row>
                <Row>
                    <control.LayerSwitcher show_progress={true} collapsed={false}/>

                    <Button tag="button" onClick={gotoGeolocation}>Geolocate</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/huhwhat">404 page</Button>
                </Row>
                <Row><Col>
                    <BootstrapTable bootstrap4 striped condensed
                        keyField={taxlotsKey} columns={taxlotsColumns} data={rows}/>
                </Col></Row>
            </Container>
            </MapProvider>
        </>
    );
}
MapPage.propTypes = {
    theme: PropTypes.object,
    bookmarks: PropTypes.object,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    setMapCenter: PropTypes.func,
}
const mapStateToProps = (state) => ({
    theme: state.theme,
    bookmarks: state.bookmarks,
    center: (state.map.lonlat == undefined)? DEFAULT_CENTER : state.map.lonlat,
    zoom:   state.map.zoom,
});
const mapDispatchToProps = {
    setMapCenter,
};
export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
