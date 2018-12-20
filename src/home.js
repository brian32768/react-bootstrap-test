import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import {ThemeContext} from './theme-context'
import Map from './map'
import Source from './source'
import Layer from './layer'

class Home extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.changeMap = this.changeMap.bind(this);
        this.state  = {
            tooltipOpen: false,
            map: "wondercity",
            index: 0
        };
    }

    toggle() {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
    }

    changeMap() {
        const cities = [
            "Rivendell",
            "Springfield",
            "Smallville",
            "Gotham City",
            "Metropolis",
            "Alphaville",
            "Acropolis"
        ]

        this.setState({map: cities[this.state.index]});
        this.state.index += 1;
        if (this.state.index >= cities.length) {
            this.state.index = 0;
        }
        console.log("changeMap", this.state)
    }

    render(props) {
        console.log("Slider is a",Slider)
        return (
            <div>
<input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
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
                    <Slider />
                    <Range />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div id="mymap">
                        Here are my layers:

                        <Layer name="1">
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
