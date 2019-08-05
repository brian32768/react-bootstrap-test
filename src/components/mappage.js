//
// This is the map page with a map and all the decorations and controls around it.
//
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem} from 'reactstrap'
import SpecialDay from './specialday'
import {Geolocation, GEOLOCATIONZOOM} from '../geolocation'
import MyMap from './map'

const geolocation = new Geolocation();

const MapPage = ({theme}) => {
    const gotoGeolocation = (e) => {
        if (!geolocation.valid) {
            console.log("can't get geolocation");
            return;
        }
        console.log(geolocation)
        //gotoLonLat(geolocation.coord, GEOLOCATIONZOOM);
    }
    return (
        <>
        <Container>
            <Row><Col>
                <SpecialDay /> &nbsp;
            </Col></Row>
            <Row><Col>
                <MyMap/>
            </Col></Row>
            <Row><Col>
                <Button tag="button" onClick={gotoGeolocation}>Geolocate</Button>
                <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                <Button tag="a" href="/huhwhat">404 page</Button>
            </Col></Row>
        </Container>
        </>
    );
}
MapPage.propTypes = {
    theme: PropTypes.object,
}
const mapStateToProps = (state) => ({
    theme: state.theme,
});
export default connect(mapStateToProps)(MapPage);
