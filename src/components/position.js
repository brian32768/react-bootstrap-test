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
        coord: PropTypes.array,
        zoom: PropTypes.number.isRequired,
    }
    onChange = (e) => {
        console.log("Position.onChange", e);
    }
    render() {
        console.log("Position.render props = ", this.props);
        const d = lut_accuracy[this.props.zoom];
        const x = parseFloat(this.props.coord[0]).toFixed(d)
        const y = parseFloat(this.props.coord[1]).toFixed(d)
        return (
            <Card>
                <input name="x" value={ x } onChange={ this.onChange }/>
                <input name="y" value={ y } onChange={ this.onChange }/>
                Zoom { this.props.zoom }
            </Card>
        );
    }
}

let mapStateToProps = (state) => (Object.assign({},
    state.position,
));
export default connect(mapStateToProps)(Position);
