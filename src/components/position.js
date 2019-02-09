import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'reactstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { transform } from 'ol/proj'

const lut_accuracy = [
    0, // 0
    0, // 1
    0, // 2
    1, // 3
    1, // 4
    2, // 5
    2, // 6
    2, // 7
    2, // 8
    2, // 9
    3, // 10
    3, // 11
    3, // 12
    3, // 13
    4, // 14
    4, // 15
    4, // 16
    5, // 17
    5, // 18
    6, // 19
    6, // 20
];


class Position extends React.Component {
    static propTypes = {
        position : PropTypes.object,
    }
    onChange = (e) => {
        console.log("Position.onChange", e);
    }
    render() {
        console.log("Position.render props = ", this.props);
        const d = lut_accuracy[this.props.position.zoom];
        const lat = parseFloat(this.props.position.lat).toFixed(d)
        const lon = parseFloat(this.props.position.lon).toFixed(d)
        return (
            <Card>
                <input name="lat" value={ lat } onChange={ this.onChange }/>
                <input name="lon" value={ lon } onChange={ this.onChange }/>
                zoom { this.props.position.zoom }
            </Card>
        );
    }
}

let mapStateToProps = (state) => (Object.assign({},
    state.position,
));
export default connect(mapStateToProps)(Position);
