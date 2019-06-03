import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip,
    ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { toLonLat, fromLonLat } from 'ol/proj'
import queryString from 'query-string'
import axios from 'axios'
import SpecialDay from './specialday'
import Position from './position'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import { Geolocation } from '../geolocation'
import { myGeoServer, usngPrecision } from '../utils'
import Geohash from '@geonet/geohash'

import { Converter } from 'usng/usng'
const usngConverter = new Converter;

const taxlotslayer = 'clatsop_wm%3Ataxlots'
const taxlots_url = myGeoServer + '/gwc/service/tms/1.0.0/'
        + taxlotslayer
        + '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';

//console.log("home.js=", process.env.SAMPLE_PASSWORD);


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
        this.props.setMapCenter(coord, zoom);
    }

    gotoBookmark = (e) => {
        const bookmarkId = e.target.name;

        // Bookmarks are stored in lat,lon
        const bookmark_wgs84 = this.props.bookmarks[bookmarkId]
        const coord = fromLonLat(bookmark_wgs84.location)

        this.setState({
            displayPoint: bookmark_wgs84.location,
            displayZoom: bookmark_wgs84.zoom
        });
        this.gotoXY(coord, bookmark_wgs84.zoom);
    }

    gotoGeolocation = (e) => {
        const defaultZoom = 17;
        console.log(this.geolocation)
        if (!this.geolocation.valid)
            return;

        this.setState({
            displayPoint: this.geolocation.coord,
            displayZoom: defaultZoom
        });
        let coord_wm = fromLonLat(this.geolocation.coord);
        this.gotoXY(coord_wm, defaultZoom);
    }

    onMapClick = (e) => {
        const coord = toLonLat(e.coordinate);
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
        const new_center_wgs84 = toLonLat(new_center_wm)
        console.log("Home.onMapMove", this.props, new_center_wm, new_zoom);

        if (new_center_wgs84[0] == 0 || new_center_wgs84[1] == 0 || new_zoom == 0)
            return;

        // does map actually need to change?
        if (this.props.mapExtent.center[0] == new_center_wm[0]
        &&  this.props.mapExtent.center[1] == new_center_wm[1]
        &&  this.props.mapExtent.zoom == new_zoom)
            return;

        console.log("MAP CENTER CHANGED");
        this.props.setMapCenter(new_center_wm, new_zoom);
        const hash = Geohash.encode(new_center_wgs84[0], new_center_wgs84[1])
        this.props.history.push(this.props.location.pathname + '?'
        //+ 'x=' + new_center_wgs84[0] + '&y=' + new_center_wgs84[1]
        + 'g=' + hash
        + '&z=' + new_zoom)
    }

    componentDidUpdate(oldProps) {
        console.log("This location:", this.props.location);
        if (oldProps.location != this.props.location) {
            console.log("Home location changed", oldProps.location);
            const q = queryString.parse(this.props.location.search);
            if (typeof q.g === 'string') {
                try {
                    const z = Number(q.z);
                    console.log("Q= ",q);
                    const ll = Geohash.decode(q.g);
                    const coord = [ ll.lng, ll.lat ]
                    console.log('decode', coord)
                    // FIXME I need to make sure the numbers are okay here
                    const wm = fromLonLat(coord);
                    this.props.setMapCenter(wm, z);
                } catch {
                    console.error("bad data in URL", q, coord)
                }
            }
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
                    <SpecialDay /> &nbsp;
                    <span id="mouseposition">mouse position</span>
                </Row>
                <Row>
                    <Position coord={ this.state.displayPoint } zoom={ this.state.displayZoom }/>
                </Row>
                <Row>
                    <div className="sliders">
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

const mapStateToProps = (state) => (Object.assign({},
    state.theme,
    state.bookmarks,
    state.mapExtent,
));
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
