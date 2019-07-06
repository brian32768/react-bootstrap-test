import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { setMapTitle } from 'actions'

const MyComponent = ({text, setMapTitle}) => {
    setMapTitle("Let's pretend this is a map");
    return (
        <>
            My own content, here it is.
        </>
    );
}
MyComponent.propTypes = {
    text: PropTypes.string,
    map: PropTypes.object
}
const mapStateToProps = (state) => ({
    map: state.map
});
const mapDispatchToProps = {
    setMapTitle
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
