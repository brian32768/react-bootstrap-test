import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {MapContext} from './map-context'

class OLMap extends Component {
    componentWillReceiveProps() {
        console.log("Map.componentWillReceiveProps()");
    }

    render() {
        console.log("Map.render(), props=", this.props)
        return (
            <MapContext.Provider value={{map:this.props.name}}>
            { this.props.children }
            </MapContext.Provider>
        );
    }
}
OLMap.contextType = MapContext;

OLMap.propTypes = {
    name: PropTypes.string.isRequired
}

export default OLMap;
