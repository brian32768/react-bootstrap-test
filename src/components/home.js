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
        displayPoint: [0,0], displayZoom: 0,
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
        const bookmark_wgs84 = this.props.bookmarks[bookmarkId]
        const coord = transform(bookmark_wgs84.location, wgs84, wm)
        console.log('Home.goto', bookmarkId, coord);

        this.props.dispatch(
            setMapPosition(coord, bookmark_wgs84.zoom)
        );
    }

    onMapClick = (e) => {
        const coord = e.coordinate;
        const v = e.map.getView()
        const zoom = v.getZoom();
        console.log("Home.onMapClick", coord);
        this.setState({
            displayPoint: transform(coord, wm,wgs84),
            displayZoom : zoom
        })
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    onMapMove = (e) => {
        const v = e.map.getView()
        const center_wm = v.getCenter()
        const zoom = v.getZoom();
        const center_wgs84 = transform(center_wm, wm,wgs84)

        // did map actually onMoveEnd
        if (this.props.position.coordinate[0] !== center_wm[0]
        || this.props.position.coordinate[1] !== center_wm[1]
        || this.props.position.zoom !== zoom) {
            console.log("Home.onMapMove", center_wgs84, zoom);
            this.props.dispatch(
                setMapPosition(center_wm, zoom)
            );
        }
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
    }

    render() {
        // Show a list of bookmarks
        const hash = this.props.bookmarks;
        const keys = Object.keys(hash);
        const list = keys.map(k => [k, hash[k].title]);

        console.log("Home.render props = ", this.props);

        return (
        <>
            <Container>
                <Row>
                    <SpecialDay />
                </Row>
                <Row>
                <Position coord={ this.state.displayPoint } zoom={ this.state.displayZoom }/>
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
                            center={ this.props.position.coordinate }
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
