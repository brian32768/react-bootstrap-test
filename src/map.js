import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { MapContext } from './map-context'

export default class OLMap extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        lat: PropTypes.number,
        lon: PropTypes.number,
    };
    static defaultProps = {
        name: "Anytown",
    };
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            opacity: 100,
            control: {},
        };
    }

    setControl = (control) => {
        console.log("map.setControl()", control);
        this.setState({control: control})
    }

    componentDidMount() {
        console.log("map.componentDidMount()", this.props);
    }

    render() {
        console.log("map.render(), props=", this.props)
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
