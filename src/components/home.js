import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'

import SpecialDay from './specialday'
import Map from './map'
import Source from './source'
import Layer from './layer'
import Control from './control'

const cities = [
    "Rivendell",
    "Springfield",
    "Smallville",
    "Gotham City",
    "Metropolis",
    "Alphaville",
    "Acropolis",
]

class Home extends Component {
    state = {
        tooltipOpen: false,
        map: "wondercity",
        cityIndex: 0,
        mapOpacity: 100
    };

    toggle = () => {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
    }

    changeMap = () => {
        this.setState({map: cities[this.state.cityIndex]});
        this.state.cityIndex += 1;
        if (this.state.cityIndex >= cities.length) {
            this.state.cityIndex = 0;
        }
        console.log("changeMap", this.state)
    }

    changeOpacity = (value) => {
        this.setState({mapOpacity : value});
    }

    startChangeCity = () => { console.log("start") }
    stopChangeCity = () =>  { console.log("stop") }
    updateCity = (value) => {
        console.log("New city", value)
        this.state.cityIndex = value
        this.setState({map: cities[this.state.cityIndex]});
    }

    render() {
        return (
            <>
            {/* A Map will have its own internal MapContext, the ThemeContext wrapping around
            everything lets me test using multiple contexts in the
            same application.

            Since there can only be a map on this "home" page it makes sense
            to declare the Map here.

            Any component between our Map tags should be able to
            access the current OpenLayers map. (Should we actually be using OL.) */}

            <Map name="starting point" mapnode={ this.mapnode } >

            <Container>
                <Row>
                    <Col>
                        <SpecialDay /><br />
                        These controls are outside the map view but still
                        uses the current map of <b>{this.state.map}</b>
                        <div className="sliders">
                            Map selection slider
                            <Slider max={ cities.length-1 } value={ this.state.cityIndex }
                                onBeforeChange={ this.startChangeCity }
                                onAfterChange={ this.stopChangeCity }
                                onChange={ this.updateCity }
                            />

                            <Control
                                onChange={ this.changeOpacity }
                                title="Layer 1"
                                value={ this.state.mapOpacity }
                            />

                            Range slider test
                            <Range />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div id="mymap" className="map"
                        ref={ node => { this.mapnode = node }} >
                        Here are my layers:

                        <Layer name="1" opacity={ this.state.mapOpacity/100 }>
                          <Source url="https://map46.com" attributions="©2018 Wildsong"/>
                        </Layer>

                        <Layer name="2">
                          <Source url="https://openstreetmap.org" attributions="©2018 OpenStreetMap"/>
                        </Layer>

                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button onClick={ this.changeMap }>Change map</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/404test">Nowhere</Button>
                  </Col>
                </Row>

            </Container>
            </Map>
            </>
        );
    }
}

let mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(Home);
