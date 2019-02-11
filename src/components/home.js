import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip,
    ListGroup, ListGroupItem } from 'reactstrap'
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'
import { transform } from 'ol/proj'

import SpecialDay from './specialday'
import Position from './position'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import Control from './control'

import { Geolocation } from '../geolocation'

const wgs84 = "EPSG:4326";
const wm = "EPSG:3857";
const defaultPosition = transform([-123,46], wgs84, wm);

class Home extends React.Component {
    static propTypes = {
        theme: PropTypes.object,
        bookmarks: PropTypes.object,
        mapExtent: PropTypes.object,
    }

    state = {
        displayPoint: [0,0], displayZoom: 0,
        tooltipOpen: false,
        mapOpacity: 100,
        markerId: 1,
    };

    constructor(props) {
        super(props);
        this.props.dispatch( setMapCenter(defaultPosition, 10) );
        this.geolocation = new Geolocation();
    }

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

        // Bookmarks are stored in lat,lon
        const bookmark_wgs84 = this.props.bookmarks[bookmarkId]
        const coord = transform(bookmark_wgs84.location, wgs84, wm)
        console.log('Home.goto', bookmarkId, coord);

        this.setState({
            displayPoint: bookmark_wgs84.location,
            displayZoom: bookmark_wgs84.zoom
        });
        this.props.dispatch(
            setMapCenter(coord, bookmark_wgs84.zoom)
        );
    }

    gotoGeolocation = (e) => {
        console.log(this.geolocation)
        if (!this.geolocation.valid)
            return;

        this.setState({
            displayPoint:  this.geolocation.coord,
            displayZoom: 16,
        })
        let coord_wm = transform(this.geolocation.coord, wgs84, wm);
        this.props.dispatch(
            setMapCenter(coord_wm, 16)
        );
    }

    onMapClick = (e) => {
        const coord = transform(e.coordinate,wm,wgs84);
        const v = e.map.getView()
        const zoom = v.getZoom();
        console.log("Home.onMapClick", coord);

        this.setState({
            markerId: ++this.state.markerId,
            displayPoint: coord,
            displayZoom : zoom
        })
    }

    // If you don't catch this event and then you click on the map,
    // the click handler will cause the map to pan back to its starting point
    onMapMove = (e) => {
        const v = e.map.getView()
        const new_center_wm = v.getCenter()
        const new_zoom = v.getZoom();
        const new_center_wgs84 = transform(new_center_wm, wm,wgs84)
        console.log("Home.onMapMove", this.props, new_center_wm, new_zoom);

        if (new_center_wgs84[0] == 0 || new_center_wgs84[1] == 0 || new_zoom == 0)
            return;

        // does map actually nned to change?
        if (this.props.mapExtent.center[0] == new_center_wm[0]
        &&  this.props.mapExtent.center[1] == new_center_wm[1]
        &&  this.props.mapExtent.zoom == new_zoom)
            return;

        console.log("MAP CENTER CHANGED");
        this.props.dispatch(
            setMapCenter(new_center_wm, new_zoom)
        );
    }
/*
    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
    }
*/
    render() {
        // Show a list of bookmarks
        const hash = this.props.bookmarks;
        const keys = Object.keys(hash);
        const list = keys.map(k => [k, hash[k].title]);
        let textMarker = {
            text: {
                text: this.state.markerId.toString()
            }
        }
        //  this draws a blue 5 pointed star
        const pointMarker = {
            image: {
                type: 'regularShape',
                points: 5,
                radius: 5,
                radius1: 5,
                radius2: 2,
                stroke: { color: 'blue', width: 1.5 }
            }
        };
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
                        view=<View zoom={ this.props.mapExtent.zoom }
                            center={ this.props.mapExtent.center }
                            minZoom={ 9 } maxZoom={ 19 }
                            />
                    >
                        <layer.Tile name="OpenStreetMap" source="OSM"/>

                        <layer.Vector
                            style={ textMarker }
                            opacity={ 1 } >
                            <interaction.Draw type="Point" />
                        </layer.Vector>
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
                    <Button tag="button" onClick={ this.gotoGeolocation }>Geolocate</Button>
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
    state.mapExtent,
));
export default connect(mapStateToProps)(Home);
