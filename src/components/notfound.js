import React from 'react'
import { connect } from 'react-redux'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap'
//const img = require('/assets/lewis_and_clark.jpg');
//const alt = 'Lewis and Clark';
const img = require('/assets/pigeon_reading_map.jpg');
const alt = 'Pigeon reading map';

const NotFound = ({ theme }) => (
    <Card className="card" style={
        {color: theme.foreground,
        backgroundColor: theme.background}}>
        <CardImg className="card_image" width="100%" src={img} alt={alt}></CardImg>
        <CardTitle>
          404 error; are you lost?
        </CardTitle>
        <CardText>
          There is no destination attached to the URL you requested.
        </CardText>
    </Card>
);

const mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(NotFound);
