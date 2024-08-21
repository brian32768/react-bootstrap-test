import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardText, CardTitle, CardSubtitle, Button} from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import SpecialDay from './specialday'; // eslint-disable-line no-unused-vars

const Home = ({theme}) => {
    return (
        <>
        <Card inverse={(theme.name == "dark")} style={{backgroundColor: theme.background}} >
            <CardTitle>
                The home page.
            </CardTitle>
            <CardSubtitle>
                A big disclaimer for you full of legalize goes here.
            </CardSubtitle>
            <CardText>
                <SpecialDay/> <br />
                Can you tell this is using the "{theme.name}" theme?<br />
            </CardText>
        </Card>
        </>
    );
}
Home.propTypes = {
    theme: PropTypes.object,
}
const mapStateToProps = (state) => ({
    theme: state.theme,
});
export default connect(mapStateToProps)(Home);
