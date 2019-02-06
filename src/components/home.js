import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { nextBookmark, selectBookmark } from '../redux/actions'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'

import SpecialDay from './specialday'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import Control from './control'

class Home extends Component {
    state = {
        tooltipOpen: false,
        map: "wondercity",
        mapOpacity: 100
    };

    toggle = () => {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
    }

    changeOpacity = (value) => {
        this.setState({mapOpacity : value});
    }

    selectBookmark = (value) => {
        console.log("Home.selectBookmark", value)
        this.props.dispatch(selectBookmark(value));
    }

    nextBookmark = (e) => {
        console.log("Home.nextBookmark");
        this.props.dispatch(nextBookmark());
    }

    render() {
        console.log("props = ", this.props);
        return (
        <>
            <Container>
                <Row><Col>
                    <SpecialDay /> The bookmark for { this.props.bookmarks.list[this.props.bookmarks.selected].title } is selected.<br />
                </Col></Row>
                <Row><Col>
                    <div className="sliders">
                        Map selection slider
                        <Slider max={ this.props.bookmarks.list.length-1 }
                            value={ this.props.bookmarks.selected }
                            onChange={ this.selectBookmark }
                        />

                        <Control
                            onChange={ this.changeOpacity }
                            title="Layer 1"
                            value={ this.state.mapOpacity }
                        />

                        Range slider test
                        <Range />
                    </div>
                </Col></Row>
                <Row><Col>
                    <Map useDefaultControls={true}
                        view=<View zoom={ this.state.zoom } center={ this.state.center }/>
                    >
                        <layer.Tile name="OpenStreetMap" source="OSM"/>
                    </Map>
                </Col></Row>
                <Row><Col>
                    <Button onClick={ this.nextBookmark }>Next bookmark</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/404test">Nowhere</Button>
                </Col></Row>
            </Container>
        </>
        );
    }
}

let mapStateToProps = (state) => (Object.assign({},
    state.theme,
    state.bookmarks)
);
export default connect(mapStateToProps)(Home);
