import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line no-unused-vars
// Font gallery: https://fontawesome.com/icons?d=gallery&s=solid
import {faGlobe, faCoffee, faCamera, faTable, faInfoCircle, faListOl, faSearch} from '@fortawesome/free-solid-svg-icons'
import {NavLink} from 'redux-first-router-link'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux'
import {toggleTheme} from './src/actions'

import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Button} from 'react-bootstrap'  // eslint-disable-line no-unused-vars

import './App.css'

// Import everything as an object so that we can look up a component using its name.
import * as components from './src/components'

const App = ({ page, theme, toggleTheme }) => {
    const Component = components[page]; // eslint-disable-line no-unused-vars
    return (
    <>
        <Navbar color={ theme.name } expand="md">
            <NavbarBrand href="/">
                <span id="sitelogo"></span>
                <span id="sitename"></span>
            </NavbarBrand>
            <NavbarToggler onClick={ (e) => {
                    e.preventDefault();
                } } />
            <Collapse isOpen={ true } navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button onClick={ toggleTheme }>Toggle theme</Button>
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
};
const mapStateToProps = (state) => ({
    page:   state.page,
    theme:  state.theme,
});
const mapDispatchToProps = {
    toggleTheme,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
