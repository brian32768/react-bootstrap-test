import React from 'react'
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
