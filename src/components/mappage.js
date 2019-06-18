import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../actions'
import { Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { toLonLat, fromLonLat } from 'ol/proj'
import axios from 'axios'
import MyMap from './Map'
import SpecialDay from './specialday'
import Position from './position'
import { Geolocation } from '../geolocation'

class MapPage extends React.Component {
    geolocation = new Geolocation();

    state = {
        displayPoint: [0,0], displayZoom: 0,
        markerId: 1,
    };

    constructor(props) {
        super(props);

/*
        const xmlfile = "https://maps.wildsong.biz/wps_buffer_request.xml";
        const wps_service_url = "https://geoserver.wildsong.biz/"

//        console.log("Load this xml file thing", xmlfile)
        axios.get(xmlfile)
        .then( (response) => {
//            console.log("I read your file for you", response);
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
//            console.log("Sorry I could not read your file");
        })
        */

    }

    gotoXY = (coord,zoom,replace=false) => {
        console.log('Home.gotoXY', coord, zoom);
        if (coord[0]==0 || coord[1]==0 || zoom==0) return;
/*
        try {
            const ll = toLonLat(coord)
            // Do a little bound check here, don't push a bad URL.
            const nLat = ll[1]
            const nLng = ll[0]
            const hash = Geohash.encode(ll[0], ll[1], 7) // 7 digits=about 150m
            const baseurl = '/map'
            const query = baseurl +
                        '?' +
                        //'lat=' + nLat + '&lng=' + nLng + '&' +
                        'g=' + hash + '&' +
                        'z=' + zoom
            if ((nLat >= 44 && nLat <= 48) && (nLng >= -126 && nLng <= -123)) {
                replace?
                this.props.replace(query) :
                this.props.push(query)
            } else {
                console.log("Outside county", coord)
            }
        } catch (err) {
            console.log("Bad input", err)
        }
        */
        //        this.props.setMapCenter(coord, zoom);
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
        if (!this.geolocation.valid)
            return;
        console.log(this.geolocation)

        // Put a marker on the map at our supposed geolocation.
        this.setState({
            displayPoint: this.geolocation.coord,
            displayZoom: defaultZoom
        });

        const defaultZoom = 17;
        const coord = fromLonLat(this.geolocation.coord);
        this.gotoXY(coord, defaultZoom);
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
        //console.log("Home.render props = ", this.props);

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
                    <MyMap center={this.props.mapExtent.center} zoom={this.props.mapExtent.zoom} />
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
MapPage.propTypes = {
    theme: PropTypes.object,
    bookmarks: PropTypes.object,

    center: PropTypes.string,
    zoom: PropTypes.string,
    setMapCenter: PropTypes.func,
}
const mapStateToProps = (state) => ({
    theme: state.theme,
    bookmarks: state.bookmarks,
    center: state.map.center,
    zoom:   state.map.zoom,
});
const mapDispatchToProps = {
    setMapCenter: (center, zoom) => dispatch({ type: 'SETCENTER', payload: {center, zoom}})
};
export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
