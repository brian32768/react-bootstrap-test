import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {MapContext} from './map-context'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap';

// I am trying to test composition here
// (see https://reactjs.org/docs/context.html "Before You Use Context")
//
// A layer can have only one source

class Map extends Component {
    componentWillReceiveProps() {
        console.log("Map.componentWillReceiveProps()");
    }

    render() {
        console.log("Map.render(), props=", this.props)
        return (
            <div ref="target">
                <h3>map of {this.props.name}</h3>
                {this.props.children}
            </div>
        );
    }
}
Map.propTypes = {
    name: PropTypes.string.isRequired
}

class Layer extends Component {
    constructor(props) {
        super(props);
        let mySource = props.children;
        console.log('Layer.new source=', mySource.props)
        this.state = {
            source: mySource.props
        };
    }

    setSource(s) {
        console.log("Layer.setSource(", s, ")");
        return 0;
    }

    componentDidMount() {
        console.log("Layer.componentDidMount(). Setting layer source to",
            this.state.source.url)
        this.setSource(this.state.source)
    }

    componentWillReceiveProps() {
        console.log("Layer.componentWillReceiveProps() Setting layer source to",
            this.state.source.url)
        this.setSource(this.state.source)
    }

    render() {
        console.log("Layer.render() source=", this.state.source)
        return (
            <div>
                Layer {this.props.name} says "My map is of <b>{this.context} </b>
                and my source is {this.props.children}." <br />
            </div>
        );
    }
}
Layer.contextType = MapContext;
Layer.propTypes = {
    name: PropTypes.string
}

class Source extends Component {
    constructor(props) {
        console.log("Source.new props=", props);
        super(props);
    }

    componentDidMount() {
        console.log("Source.componentDidMount()")
    }

    componentWillReceiveProps() {
        console.log("Source.componentWillReceiveProps()");
    }

    render() {
        console.log("Source.render() props=", this.props)
        return (
            <em>{this.props.url}</em>
        );
    }
}
Source.propTypes = {
    url: PropTypes.string.isRequired
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
            <MapContext.Provider value={this.state.map}>
            <Container>
                <Row>
                    <Col>
                    Outside the map view but still wants the current map:
                    {this.state.map}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Map name={this.state.map}>
                        <Layer name="1">
                            <Source
                                url="https://map46.com"
                                attributions="©2018 Wildsong"
                            />
                        </Layer>
                        <Layer name="2">
                            <Source
                                url="https://openstreetmap.org"
                                attributions="©2018 OpenStreetMap"
                            />
                        </Layer>
                        </Map>
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
            </MapContext.Provider>
            </div>
        );
    }
}

export default Home;
