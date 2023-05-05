// App.tsx pigeon-messenger-service
import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line no-unused-vars
// Font gallery: https://fontawesome.com/icons?d=gallery&s=solid
import {faGlobe, faCoffee, faCamera, faTable, faInfoCircle, faListOl, faSearch} from '@fortawesome/free-solid-svg-icons'

import { NavLink } from 'redux-first-router-link'; // eslint-disable-line no-unused-vars
import { toggleTheme } from './actions'
import { createTask } from './redux/actions'

import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Button} from 'react-bootstrap'  // eslint-disable-line no-unused-vars

import './App.css'

import { PersistGate } from 'redux-persist/integration/react'
import configStore from './redux/configstore'
import { Container, Row, Col } from 'react-bootstrap'
import { About, Contact, Home, NotFound, Pictures, Table, TasksPage } from './components'
import { themes } from './themes'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

// Import everything as an object so that we can look up a component using its name.
import * as components from './components'

const App = ({ page, theme, toggleTheme }) => {
    const CurrentPage = components[page]; // eslint-disable-line no-unused-vars
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

            <BrowserRouter>
            <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/table" component={ Table } />
            <Route path="/pictures" component={ Pictures } />
            <Route path="/about" component={ About } />
            <Route path="/contact" component={ Contact } />
            <Route path="/tasks" component={ TasksPage } />
            <Route render={() => <NotFound/> } />
            </Switch>
            </BrowserRouter>

            <CurrentPage />
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
//export default connect(mapStateToProps, mapDispatchToProps)(App);

