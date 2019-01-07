// control.js react-bootstrap-test
//
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { MapContext } from './map-context'
import { ThemeContext } from './theme-context'

/*
    This control has to access properties both from its immediate parent ("source")
    and from a distant ancestor ("map")
    And maybe the ThemeContext too, just to make it more interesting.
*/

export default class Control extends Component {
    render() {
        return (
            <div className="control">
            <MapContext.Consumer>
            {this.props.title} opacity {this.props.value}%
            <Slider onChange={this.props.onChange} value={this.props.value}/>

            </MapContext.Consumer>
            </div>
        );
    }
}

Control.propTypes = {
    source: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func
};
