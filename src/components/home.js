import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapPosition } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip,
    ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { transform } from 'ol/proj'

import SpecialDay from './specialday'
import Position from './position'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import Control from './control'

const wgs84 = "EPSG:4326";
const wm = "EPSG:3857";
const defaultPosition = transform([-123,46], wgs84, wm);

// Round off to some reasonable number of decimal places
// based on this zoom level

class Home extends React.Component {
    static propTypes = {
        theme: PropTypes.object,
        bookmarks: PropTypes.object,
        position: PropTypes.object,
    }

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

    gotoBookmark = (e) => {
        const bookmarkId = e.target.name;
        const bookmark = this.props.bookmarks[bookmarkId]
        console.log('Home.goto', bookmarkId, bookmark);

        this.props.dispatch(
            setMapPosition(bookmark.location[0], bookmark.location[1], bookmark.zoom)
        );
    }

    onMapClick = (e) => {
        const coord = transform(e.coordinate, wm,wgs84)
        console.log("Home.onMapClick", coord);
        console.log(coord[0], coord[1]);
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    onMapMove = (e) => {
        const v = e.map.getView()
        const center_wm = v.getCenter()
        const zoom = v.getZoom();
        const center_wgs84 = transform(center_wm, wm,wgs84)
        console.log("Home.onMapMove", center_wgs84, zoom);
        /*this.props.dispatch(
            setMapPosition(center_wgs84[0], center_wgs84[1], zoom)
        );*/
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
    }

    render() {
        // Show a list of bookmarks
        const hash = this.props.bookmarks;
        const keys = Object.keys(hash);
        const list = keys.map(k => [k, hash[k].title]);

        const center_wm = transform( [this.props.position.lon, this.props.position.lat], wgs84, wm);
        console.log("Home.render props = ", this.props, center_wm);

        return (
        <>
            <Container>
                <Row>
                    <SpecialDay />
                </Row>
                <Row>
                <Position lat={ this.props.position.lat } lon={ this.props.position.lon } zoom={ this.props.position.zoom }/>
                </Row>
                <Row>
                    <div className="sliders">
                        <Control
                            onChange={ this.changeOpacity }
                            title="Layer 1"
                            value={ this.state.mapOpacity }
                        />

                        Range slider test
                        <Range />
                    </div>
                </Row>
                <Row><Col>
                    <Map useDefaultControls={true}
                        onSingleClick={ this.onMapClick } onMoveEnd={ this.onMapMove }
                        view=<View zoom={ this.props.position.zoom }
                            center={ center_wm }
                            minZoom={ 9 } maxZoom={ 19 }
                            />
                    >
                        <layer.Tile name="OpenStreetMap" source="OSM"/>
                    </Map>
                </Col><Col>
                    <ListGroup>
                    { list.map(item =>
                          <ListGroupItem tag="button" key={ item[0] } name={ item[0] }
                          onClick={ this.gotoBookmark }
                          action>{item[0]} {item[1]}</ListGroupItem>
                    )}
                    </ListGroup>
                </Col></Row>
                <Row>
                    <Button tag="button">Do nothing</Button>
                    <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">ReactStrap docs</Button>
                    <Button tag="a" href="/huhwhat">404 page</Button>
                </Row>
            </Container>
        </>
        );
    }
}

let mapStateToProps = (state) => (Object.assign({},
    state.theme,
    state.bookmarks,
    state.position,
));
export default connect(mapStateToProps)(Home);
