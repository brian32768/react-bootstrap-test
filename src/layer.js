import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, Button, Tooltip} from 'reactstrap'

// We have not 1 but 2 upstream context here,
// to specify a theme and map stuff and
import {ThemeContext} from './theme-context'
import {MapContext} from './map-context'
// a downstream context, to pass stuff to child components
import {LayerContext} from './layer-context'

import Map from './map'
import Source from './source'

// I need to know about both the upstream MapContext
// so that I can add my new layer to the map
// and I need to create my own LayerContext
// so that I can tell my child Source component how to find my callback.

export default class Layer extends Component {
    constructor(props) {
        super(props);
        this.setSource = this.setSource.bind(this);
        console.log('Layer.new props=', props)
    }

    setSource(olsource) {
        // callback from our child Source component
        console.log("Layer.setSource(",this.props.name,") olsource=", olsource);
    }

    componentDidMount() {
        console.log("Layer.componentDidMount().");
    }

    componentWillReceiveProps() {
        console.log("Layer.componentWillReceiveProps()");
    }

    render() {
        const callChildren = (theme) => {
            return (
                <div style={{opacity:this.props.opacity}}>
                {this.props.children}
                </div>
            );
        }
        console.log("Layer.render props=", this.props.children);
        return (
            <ThemeContext.Consumer>
            {theme => (
                <LayerContext.Provider value={{
                    onSetSource:this.setSource
                }}>
                    {callChildren(theme)}
                </LayerContext.Provider>
            )}
            </ThemeContext.Consumer>
        );
    }
}
Layer.contextType = MapContext;

Layer.propTypes = {
    name: PropTypes.string.isRequired,
    opacity: PropTypes.number
}
