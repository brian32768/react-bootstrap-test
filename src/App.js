import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapQuery } from './reducers'
import { MyNavbar } from './components'

// Go read this: https://github.com/faceyspacey/redux-first-router-link#readme
import { NavLink } from 'redux-first-router-link'

// Import everything as an object so that we can look up a component using its name.
import * as components from './components'

const App = ({ page, center, zoom, changeUser }) => {
  const Component = components[page]
  return (
    <>
        <MyNavbar />
    </>
  )
}
App.propTypes = {
    page: PropTypes.string,
    center: PropTypes.string,
    zoom: PropTypes.string,
};
const mapStateToProps = (state) => ({
    page: state.page,
    center: state.map.center,
    zoom: state.map.zoom
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
