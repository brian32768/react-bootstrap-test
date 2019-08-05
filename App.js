import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Font gallery: https://fontawesome.com/icons?d=gallery&s=solid
import { faGlobe, faCoffee, faCamera, faTable, faInfoCircle, faListOl, faSearch } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'redux-first-router-link'
import { connect } from 'react-redux'
import { toggleTheme } from './src/actions'
import { setMapQuery } from './src/reducers'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'
import 'ol/ol.css'
import './App.css'

// Import everything as an object so that we can look up a component using its name.
import * as components from './src/components'

const App = ({ page, center, zoom, theme, toggleTheme }) => {
    const Component = components[page]
    return (
    <>
        <Navbar color={ theme.name } expand="md">
            <NavbarBrand href="/">
                <span id="sitelogo"></span>
                <span id="sitename"></span>
            </NavbarBrand>
            <NavbarToggler onClick={ (e) => {
                    console.log("toggle collapse");
                    e.preventDefault();
                } } />
            <Collapse isOpen={ true } navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button onClick={ toggleTheme }>Toggle theme</Button>
                </NavItem>
                <NavItem>
                    <NavLink to={{ type: "MAP", query: setMapQuery(center, zoom) }}
                        activeClassName='active'
                        activeStyle={{ color: 'pink' }}
                        exact={true}
                        strict={true}
                    ><FontAwesomeIcon icon={ faGlobe } /> Map</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/table"><FontAwesomeIcon icon={ faTable } /> Table</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/pictures"><FontAwesomeIcon icon={ faCamera } /> Pictures</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/search"><FontAwesomeIcon icon={ faSearch } /> Search</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/about"><FontAwesomeIcon icon={ faInfoCircle } /> About</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/contact">Contact us</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
        </Navbar>

        <Component />
    </>
    );
}
App.propTypes = {
    page: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number
};
const mapStateToProps = (state) => ({
    page:   state.page,
    center: state.map.center,
    zoom:   state.map.zoom,
    theme:  state.theme,
});
const mapDispatchToProps = {
    toggleTheme,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
