import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../actions'
import { Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { toLonLat, fromLonLat } from 'ol/proj'
import MyMap from './Map'
import SpecialDay from './specialday'
import Position from './position'
import { Geolocation } from '../geolocation'

const geolocation = new Geolocation();

const MapPage = ({theme, bookmarks, center, zoom, setMapCenter}) => {
    const [displayPoint, updateDisplayPoint] = useState( [0,0] );
    const [displayZoom, updateDisplayZoom]   = useState( 0 );
    const [markerId, updateMarkerId]         = useState( 1 );

    const gotoXY = (coord, zoom) => {
        console.log('MapPage.gotoXY', coord, zoom);
        if (coord[0]==0 || coord[1]==0 || zoom==0) return;
        setMapCenter(coord, zoom);
    }

    const gotoBookmark = (e) => {
        const bookmarkId = e.target.name;

        // Bookmarks are stored in WGS84
        const bookmark_wgs84 = bookmarks[bookmarkId]
        const coord = fromLonLat(bookmark_wgs84.location)
        updateDisplayPoint(bookmark_wgs84.location)
        updateDisplayZoom(bookmark_wgs84.zoom);
        gotoXY(coord, bookmark_wgs84.zoom);
    }

    const gotoGeolocation = (e) => {
        if (!geolocation.valid)
            return;
        console.log(geolocation)
        const defaultZoom = 17;
        updateDisplayPoint(geolocation.coord);
        updateDisplayZoom(defaultZoom);
        const coord = fromLonLat(geolocation.coord);
        gotoXY(coord, defaultZoom);
    }

    // Show a list of bookmarks
    const hash = bookmarks;
    const keys = Object.keys(hash);
    const list = keys.map(k => [k, hash[k].title]);

    // I think I might have to pass a function to the component
    // instead of data, I think it never gets updated.
    const textMarker = {
        text: {
            text: markerId.toString()
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

    return (
        <>
            <Container>
                <Row>
                    <SpecialDay /> &nbsp;
                    <span id="mouseposition">mouse position</span>
                </Row>
                <Row>
                    <Position coord={ displayPoint } zoom={ displayZoom }/>
                </Row>
                <Row>
                    <div className="sliders">
                        Range slider test
                        <Range />
                    </div>
                </Row>
                <Row><Col>
                    <MyMap center={center} zoom={zoom} />
                </Col><Col>
                    <ListGroup>
                    { list.map(item =>
                          <ListGroupItem tag="button" key={ item[0] } name={ item[0] }
                          onClick={ gotoBookmark }
                          action>{item[0]} {item[1]}</ListGroupItem>
                    )}
                    </ListGroup>
                </Col></Row>
                <Row>
                    <Button tag="button" onClick={ gotoGeolocation }>Geolocate</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/huhwhat">404 page</Button>
                </Row>
            </Container>
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
    center: state.map.center,
    zoom:   state.map.zoom,
});
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
