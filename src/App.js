// App.js react-bootstrap-test
// All this functional component does is declare the user interface.
// The real work is done in components included here.

// React
import React, { PropTypes } from 'react';
import {Link} from 'react-router';

// React + Bootstrap
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, MenuItem, Grid, Row, Col} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = ({children}) => (
    <main>
        <Navbar className="navbar-top" fluid>
            <Navbar.Collapse>
                <Nav pullRight>
                    <IndexLinkContainer to='/about'>
                        <MenuItem>About</MenuItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to='/'>
                        <MenuItem>Pictures</MenuItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to='/map'>
                        <MenuItem>Map</MenuItem>
                    </IndexLinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Grid fluid>
            <Row>
                <Col sm={3} md={2} className="sidebar">
                    <Nav stacked>
                    </Nav>
                </Col>

                <Col sm={9} smOffset={3} md={10} mdOffset={2} className="content">
                    {children}
                </Col>
            </Row>
        </Grid>
    </main>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;
