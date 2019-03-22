import React from 'react'
import PropTypes from 'prop-types'
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

const VerticalNavbar = ({ theme, toggleTheme }) => {
    const toggleCollapse = (e) => {
        e.preventDefault();
        console.log("toggleCollapse");
    }
    return (
        <>
            <Nav vertical={ true } color={ theme.name } expand="md">
                <NavItem>
                    <Button onClick={ toggleTheme }>Toggle theme</Button>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/table">Table</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/tasks">Tasks</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/pictures">Pictures</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/about">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/contact">Contact us</NavLink>
                </NavItem>
            </Nav>
        </>
    );
}

const mapStateToProps = (state) => (
    state.theme
);
const mapDispatchToProps = {
    toggleTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalNavbar);
