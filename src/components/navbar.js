import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCamera, faTable, faInfoCircle, faListOl } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { toggleTheme } from '../redux/actions'
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Button } from 'reactstrap'

/*class MyNavbar extends React.Component {
    state = {
        isOpen: true
    };

    toggleCollapse = (e) => {
        e.preventDefault();
        this.setState({ isOpen: this.state.isOpen });
    }

    render() {
        */

const MyNavbar = ({ theme, toggleTheme }) => {
    const toggleCollapse = (e) => {
        e.preventDefault();
        console.log("toggleCollapse");
    }
    return (
        <>
            <Navbar color={ theme.name } expand="md">
                <NavbarBrand href="/">
                    <span id="sitelogo"></span>
                    <span id="sitename"></span>
                </NavbarBrand>
                <NavbarToggler onClick={ toggleCollapse } />
                <Collapse isOpen={ true } navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={ toggleTheme }>Toggle theme</Button>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/"><FontAwesomeIcon icon={ faCoffee } /> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/table"><FontAwesomeIcon icon={ faTable } /> Table</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/tasks"><FontAwesomeIcon icon={ faListOl } /> Tasks</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/pictures"><FontAwesomeIcon icon={ faCamera } /> Pictures</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/about"><FontAwesomeIcon icon={ faInfoCircle } /> About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Contact us</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

const mapStateToProps = (state) => (
    state.theme
);
const mapDispatchToProps = {
    toggleTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
