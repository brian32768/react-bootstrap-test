import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { ThemeContext } from './theme-context'

/*
    This control has to access properties both from its immediate parent ("source")
    and from a distant ancestor ("map")
    And maybe the ThemeContext too, just to make it more interesting.
*/

export default class Control extends Component {
    render() {
        return (
            <Fragment>
            {this.props.title} opacity {this.props.value}%
            <Slider onChange={this.props.onChange} value={this.props.value}/>
            </Fragment>
        );
    }
}

Control.propTypes = {
    source: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func
};
