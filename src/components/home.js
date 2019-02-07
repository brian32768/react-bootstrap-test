import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { nextBookmark, selectBookmark, setMouseCoord } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { transform } from 'ol/proj'

import SpecialDay from './specialday'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import Control from './control'

import {CopyToClipboard} from 'react-copy-to-clipboard';

const wgs84 = "EPSG:4326";
const wm = "EPSG:3857";

class Home extends React.Component {
    state = {
        tooltipOpen: false,
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

    onMapClick = (e) => {
        console.log("Home.click", e.coordinate);
        this.props.dispatch( setMouseCoord(e.coordinate) );
    }

    render() {
        const selectedBookmark = this.props.bookmarks.list[this.props.bookmarks.selected]
        const location_wm = transform(selectedBookmark.location, wgs84,wm)
        const zoom = selectedBookmark.zoom
        console.log("Home.render props = ", this.props, selectedBookmark.location, location_wm);
        return (
        <>
            <Container>
                <Row><Col>
                    <SpecialDay /> { selectedBookmark.title } is selected. { selectedBookmark.location } <br />
                </Col></Row>
                <Row><Col>
                <input name="lat" value={ this.props.mouse.lat } onChange={ this.onChange }/>
                <input name="lon" value={ this.props.mouse.lon } onChange={ this.onChange }/>
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
                        onSingleClick={ this.onMapClick }
                        view=<View zoom={ zoom } center={ location_wm }/>
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
    state.bookmarks,
    state.mouse,
));
export default connect(mapStateToProps)(Home);
