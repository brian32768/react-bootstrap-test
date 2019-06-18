import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap'
import queryString from 'query-string'
import axios from 'axios'
import SpecialDay from './specialday'

const Home = ({ theme, push }) => (
    <Card inverse={ (theme.name == "dark") }
            style={{backgroundColor: theme.background}} >
        <CardTitle>
            The home page.
        </CardTitle>
        <CardSubtitle>
            A big disclaimer for you full of legalize goes here.
        </CardSubtitle>
        <CardText>
            <SpecialDay /> &nbsp;
            Can you tell this is using the "{theme.name}" theme?
            I should probably ask you to click this button.
        </CardText>
    </Card>
);
Home.propTypes = {
    theme: PropTypes.object
}
const mapStateToProps = (state) => ( state.theme );
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
