//
// This is the map page with a map and all the decorations and controls around it.
//
import React, {useState, useEffect} from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Row, Col, Button, Tooltip, ListGroup, ListGroupItem} from 'reactstrap'; // eslint-disable-line no-unused-vars
import SpecialDay from './specialday'; // eslint-disable-line no-unused-vars
import {Geolocation, GEOLOCATIONZOOM} from '../geolocation'
import MyMap from './map'; // eslint-disable-line no-unused-vars

const geolocation = new Geolocation();

const MapPage = ({theme}) => {
    const gotoGeolocation = () => {
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
