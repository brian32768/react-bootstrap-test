import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import {ThemeContext} from './theme-context'
import Map from './map'
import Source from './source'
import Layer from './layer'

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
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.changeMap = this.changeMap.bind(this);
        this.state  = {
            tooltipOpen: false,
            map: "wondercity",
            cityIndex: 0,
            mapOpacity: 100
        };
    }

    toggle() {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
    }

    changeMap() {
        this.setState({map: cities[this.state.cityIndex]});
        this.state.cityIndex += 1;
        if (this.state.cityIndex >= cities.length) {
            this.state.cityIndex = 0;
        }
        console.log("changeMap", this.state)
    }

    render(props) {
        let startChangeCity = () => { console.log("start") }
        let stopChangeCity = () =>  { console.log("stop") }
        let updateCity = (value) => {
            console.log("New city", value)
            this.state.cityIndex = value
            this.setState({map: cities[this.state.cityIndex]});
        }
        let changeOpacity = (value) => {
            this.setState({mapOpacity : value});
        }

        return (
            <div>
            {/* A Map will have its own internal MapContext, the ThemeContext wrapping around
            everything lets me test using multiple contexts in the
            same application.

            Since there can only be a map on this "home" page it makes sense
            to declare the Map here.

            Any component between our Map tags should be able to
            access the current OpenLayers map. (Should we actually be using OL.) */}

            <Map name="starting point">

            <Container>
                <Row>
                    <Col>
                    This row is outside the map view but still
                    uses the current map of <b>{this.state.map}</b>
                    <div className="sliders">
                        Map
                        <Slider max={cities.length-1} value={this.state.cityIndex}
                            onBeforeChange={startChangeCity} onAfterChange={stopChangeCity} onChange={updateCity}/>

                        Layer 1 opacity {this.state.mapOpacity}%
                        <Slider onChange={changeOpacity}
                            value={this.state.mapOpacity}/>

                        <Range />
                    </div>

                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div id="mymap">
                        Here are my layers:

                        <Layer name="1" opacity={this.state.mapOpacity/100}>
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
                    <Button onClick={this.changeMap}>Change map</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/404test">Nowhere</Button>
                  </Col>
                </Row>
            </Container>

            </Map>
            </div>
        );
    }
}

export default Home;
