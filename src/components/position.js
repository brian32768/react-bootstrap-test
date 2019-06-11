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

const Position = ({ coord, zoom }) => {
    const onChange = (e) => {
        console.log("Position.onChange", e);
    }
    const d = lut_precision[zoom];
    let x = coord[0];
    let y = coord[1];
    if (typeof x === 'string')
        x = parseFloat(x)
    if (typeof y === 'string')
        y = parseFloat(y)
    x = x.toFixed(d)
    y = y.toFixed(d)
    const usngConverter = new Converter
    const hash = usngConverter.LLtoUSNG(y,x,d);
    return (
        <Card>
            { x } { y } { zoom } <br />
            { hash }
        </Card>
    );
}

Position.propTypes = {
    coord: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
}

export default Position;
