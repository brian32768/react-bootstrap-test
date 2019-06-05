import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'reactstrap'
import { Converter } from 'usng/usng';

const lut_precision = [
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
// This component only displays a posiion passed in as props.
// It does not care about the position stored in redux state.

class Position extends React.Component {
    static propTypes = {
        coord: PropTypes.array,
        zoom: PropTypes.number.isRequired,
    }
    onChange = (e) => {
        console.log("Position.onChange", e);
    }
    render() {
        //console.log("Position.render props = ", this.props);
        const d = lut_precision[this.props.zoom];
        let x = this.props.coord[0];
        let y = this.props.coord[1];
        if (typeof x === 'string')
            x = parseFloat(x)
        if (typeof y === 'string')
            y = parseFloat(y)
        x = x.toFixed(d)
        y = y.toFixed(d)
        const usngConverter = new Converter
        let hash = usngConverter.LLtoUSNG(y,x,d);
        return (
            <Card>
                { x } { y } { this.props.zoom } <br />
                { hash }
            </Card>
        );
    }
}

export default Position;
