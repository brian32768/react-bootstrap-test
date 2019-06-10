import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCamera, faTable, faInfoCircle, faListOl } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { toggleTheme } from '../redux/actions'
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
    Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const MyNavbar = ({ theme, toggleTheme }) => (
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
                    <NavLink to="/"><FontAwesomeIcon icon={ faCoffee } /> Home</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/table"><FontAwesomeIcon icon={ faTable } /> Table</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/tasks"><FontAwesomeIcon icon={ faListOl } /> Tasks</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                    <NavLink to="/pictures"><FontAwesomeIcon icon={ faCamera } /> Pictures</NavLink> &nbsp;
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
    </>
)

const mapStateToProps = (state) => (
    state.theme
);
const mapDispatchToProps = {
    toggleTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
