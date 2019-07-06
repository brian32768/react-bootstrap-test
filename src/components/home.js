import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap'
import SpecialDay from './specialday'
import MyComponent from './mycomponent'

const Home = ({theme, map}) => {
    return (
        <>
        <div>{ map.title }</div>
        <Card inverse={(theme.name == "dark")} style={{backgroundColor: theme.background}} >
            <CardTitle>
                The home page.
            </CardTitle>
            <CardSubtitle>
                A big disclaimer for you full of legalize goes here.
            </CardSubtitle>
            <CardText>
                <SpecialDay /> <br />
                Can you tell this is using the "{theme.name}" theme?<br />
                <MyComponent />
            </CardText>
        </Card>
        </>
    );
}
Home.propTypes = {
    theme: PropTypes.object,
    map: PropTypes.object
}
const mapStateToProps = (state) => ({
    theme: state.theme,
    map: state.map
});
export default connect(mapStateToProps)(Home);
