import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {LayerContext} from '../layer-context'

class Source extends Component {
    constructor(props) {
        super(props);
        let d = Math.round(Math.random() * 10000).toString();
        console.log("Source.new() magic number =", d);
        this.state = {
            source: d
        }
    }

    componentDidMount() {
        console.log("Source.componentDidMount() context=", this.context);
        // I can't use this.context in the constructor because
        // it has not been defined yet there.
        this.context.onSetSource(this.state.source);
        this.context.map.setControl({name:"Kali"});
    }

    render() {
        console.log("Source.render props=", this.props)
        return (
            <div>
                {this.state.source}
                {this.props.url}
            </div>
        );
    }
}
Source.contextType = LayerContext;

Source.propTypes = {
    url: PropTypes.string.isRequired
}

export default Source;
