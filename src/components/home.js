import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip,
    ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { transform } from 'ol/proj'
import axios from 'axios'
import SpecialDay from './specialday'
import Position from './position'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import usng from 'usng/usng'
import Control from './control'

import { Geolocation } from '../geolocation'

import { myGeoServer, wgs84, wm, astoria_ll, usngPrecision } from '../utils'

const defaultPosition = transform(astoria_ll, wgs84, wm);

const taxlotslayer = 'clatsop_wm%3Ataxlots'
const taxlots_url = myGeoServer + '/gwc/service/tms/1.0.0/'
        + taxlotslayer
        + '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';

console.log("home.js=", process.env.SAMPLE_PASSWORD);

class Home extends React.Component {
    static propTypes = {
        theme: PropTypes.object,
        bookmarks: PropTypes.object,
        mapExtent: PropTypes.object,
    }

    geolocation = new Geolocation();

    state = {
        displayPoint: [0,0], displayZoom: 0,
        tooltipOpen: false,
        mapOpacity: 100,
        markerId: 1,
    };

    constructor(props) {
        super(props);

        const xmlfile = "https://maps.wildsong.biz/wps_buffer_request.xml";
        const wps_service_url = "https://geoserver.wildsong.biz/"

        console.log("Load this xml file thing", xmlfile)
        axios.get(xmlfile)
        .then( (response) => {
            console.log("I read your file for you", response);
            // Now send it right on back to the WPS server
            axios({
                method: 'post',
                url: wps_service_url,
                data: xmlfile
            })
            .then ( (response) => {
                console.log("Binky", response);
            })
            .catch ( (error) => {
                console.log("Sorry POST failed");
            })
        })
        .catch( (error) => {
            console.log("Sorry I could not read your file");
        })
    }

    toggle = () => {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
    }

    changeOpacity = (value) => {
        this.setState({mapOpacity : value});
    }

    gotoXY = (coord,zoom) => {
        if (coord[0]==0 || coord[1]==0 || zoom==0) return;
        console.log('Home.gotoXY', coord, zoom);
        this.props.dispatch(
            setMapCenter(coord, zoom)
        );
    }

    gotoBookmark = (e) => {
        const bookmarkId = e.target.name;

        // Bookmarks are stored in lat,lon
        const bookmark_wgs84 = this.props.bookmarks[bookmarkId]
        const coord = transform(bookmark_wgs84.location, wgs84, wm)

        this.setState({
            displayPoint: bookmark_wgs84.location,
            displayZoom: bookmark_wgs84.zoom
        });
        this.gotoXY(coord, bookmark_wgs84.zoom);
    }

    gotoGeolocation = (e) => {
        const defaultZoom = 15;
        console.log(this.geolocation)
        if (!this.geolocation.valid)
            return;

        this.setState({
            displayPoint: this.geolocation.coord,
            displayZoom: defaultZoom
        });
        let coord_wm = transform(this.geolocation.coord, wgs84, wm);
        this.gotoXY(coord_wm, defaultZoom);
    }

    onMapClick = (e) => {
        const coord = transform(e.coordinate,wm,wgs84);
        const v = e.map.getView()
        const zoom = v.getZoom();
        console.log("Home.onMapClick", coord);

        this.setState({
            markerId: ++this.state.markerId,
            displayPoint: coord,
            displayZoom : zoom
        })
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    onMapMove = (e) => {
        const v = e.map.getView()
        const new_center_wm = v.getCenter()
        const new_zoom = v.getZoom();
        const new_center_wgs84 = transform(new_center_wm, wm,wgs84)
        console.log("Home.onMapMove", this.props, new_center_wm, new_zoom);

        if (new_center_wgs84[0] == 0 || new_center_wgs84[1] == 0 || new_zoom == 0)
            return;

        // does map actually nned to change?
        if (this.props.mapExtent.center[0] == new_center_wm[0]
        &&  this.props.mapExtent.center[1] == new_center_wm[1]
        &&  this.props.mapExtent.zoom == new_zoom)
            return;

        console.log("MAP CENTER CHANGED");
        this.props.dispatch(
            setMapCenter(new_center_wm, new_zoom)
        );
    }

    componentDidUpdate(oldProps) {
        console.log("This location:", this.props.location);
        if (oldProps.location != this.props.location) {
            console.log("Home location changed", oldProps.location);
        }
    }

    render() {
        // Show a list of bookmarks
        const hash = this.props.bookmarks;
        const keys = Object.keys(hash);
        const list = keys.map(k => [k, hash[k].title]);

        // I think I might have to pass a function to the component
        // instead of data, I think it never gets updated.
        let textMarker = {
            text: {
                text: this.state.markerId.toString()
            }
        }
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
        console.log("Home.render props = ", this.props);

        return (
        <>
            <Container>
                <Row>
                    <SpecialDay />
                </Row>
                <Row>
                    <Position coord={ this.state.displayPoint } zoom={ this.state.displayZoom }/>
                </Row>
                <Row>
                    <div className="sliders">
                        <Control
                            onChange={ this.changeOpacity }
                            title="Layer 1"
                            value={ this.state.mapOpacity }
                        />

                        Range slider test
                        <Range />
                    </div>
                </Row>
                <Row><Col>
                    <Map useDefaultControls={true}
                        onSingleClick={ this.onMapClick } onMoveEnd={ this.onMapMove }
                        view=<View zoom={ this.props.mapExtent.zoom }
                            center={ this.props.mapExtent.center }
                            minZoom={ 9 } maxZoom={ 19 }
                            />
                    >
                        <layer.Tile name="OpenStreetMap" source="OSM"/>
	                <layer.VectorTile format="MVT" url={ taxlots_url } />
                        <layer.Vector
                            style={ pointMarker }
                            opacity={ 1 } >
                            <interaction.Draw type="Point" />
                        </layer.Vector>
                    </Map>
                </Col><Col>
                    <ListGroup>
                    { list.map(item =>
                          <ListGroupItem tag="button" key={ item[0] } name={ item[0] }
                          onClick={ this.gotoBookmark }
                          action>{item[0]} {item[1]}</ListGroupItem>
                    )}
                    </ListGroup>
                </Col></Row>
                <Row>
                    <Button tag="button" onClick={ this.gotoGeolocation }>Geolocate</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/huhwhat">404 page</Button>
                </Row>
            </Container>
        </>
        );
    }
}

let mapStateToProps = (state) => (Object.assign({},
    state.theme,
    state.bookmarks,
    state.mapExtent,
));
export default connect(mapStateToProps)(Home);
