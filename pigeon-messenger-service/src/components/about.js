import React from 'react';   // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'react-bootstrap';   // eslint-disable-line no-unused-vars

const About = ({ theme }) => (
    <Card inverse={ (theme.name == "dark") }
            style={{backgroundColor: theme.background}} >
        <CardTitle>
            About react-bootstrap-test
        </CardTitle>
        <CardText>
            This app is a test of React and Bootstrap.<br/>
            Can you tell this is using the "{theme.name}" theme?
        </CardText>
    </Card>
);
About.propTypes = {
    theme: PropTypes.object
}
const mapStateToProps = (state) => ({
    theme: state.theme
});
export default connect(mapStateToProps)(About);
