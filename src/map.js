// map.js react-bootstrap-test
//
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { MapContext } from './map-context'

class OLMap extends Component {
    constructor(props) {
        super(props);
        this.setControl = this.setControl.bind(this);
        this.state = {
            opacity: 100,
            control: {}
        }
    }

    setControl(control) {
        console.log("Map.setControl()", control);
        this.setState({control: control})
    }

    render() {
        console.log("Map.render(), props=", this.props)
        return (
            <MapContext.Provider value={{
                name: this.props.name,
                map: this
            }}>
            { this.props.children }
            <p>{ this.state.control.name }</p>
            </MapContext.Provider>
        );
    }
}

OLMap.propTypes = {
    name: PropTypes.string.isRequired
}

export default OLMap
