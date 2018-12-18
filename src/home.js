import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {MapContext} from './map-context'
import {LayerContext} from './layer-context'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'

import Map from './map'
import Source from './source'

// I need to know about both the upstream MapContext
// so that I can add my new layer to the map
// and I need to create my own LayerContext
// so that I can tell my child Source component how to find my callback.

class Layer extends Component {
    constructor(props) {
        super(props);
        this.setSource = this.setSource.bind(this);
        console.log('Layer.new props=', props)
    }

    setSource(olsource) {
        // callback from our child Source component
        console.log("Layer.setSource(",this.props.name,") olsource=", olsource);
        // IRL, we'd call OL here, something like this:
        //layer.setSource(olsource)
    }

    componentDidMount() {
        console.log("Layer.componentDidMount().");
    }

    componentWillReceiveProps() {
        console.log("Layer.componentWillReceiveProps()");
    }

    render() {
        console.log("Layer.render props=", this.props.children);

        {/* In a more perfect world I'd be able to pass the callback as a property
            instead of inside a context but I cannot figure out how
            This gives an error that props is not extensible

            Oh well, context works for now. */}
        //this.props.children.props.callback = this.setSource;

        return (
            <div>
            <LayerContext.Provider value={{onSetSource:this.setSource}}>
                {this.props.children}
            </LayerContext.Provider>
            </div>
        );
    }
}
Layer.contextType = MapContext;

Layer.propTypes = {
    name: PropTypes.string.isRequired
}

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
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div id="fakemap">
                        Pretend this box contains a map. Here are my layers:

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
