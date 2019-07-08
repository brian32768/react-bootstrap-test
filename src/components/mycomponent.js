import React from 'react'
import PropTypes from 'prop-types';
import {Tile} from 'ol/layer'
import {OSM} from 'ol/source'

class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.map.addLayer(new Tile({ source: new OSM()}))
    }

    componentDidMount() {
        this.props.map.setTarget(this.refs.target)
    }

    render() {
        console.log("MyComponent", this.props.map);
        return (
            <>
            This is the map.
            <div ref="target" style={{width:400,height:200}}></div>
            </>
        );
    }
}
MyComponent.propTypes = {
    map: PropTypes.object
}
//const mapStateToProps = (state) => {
//    map: state.map.theMap
//}
export default MyComponent;
