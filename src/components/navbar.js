import React from 'react'
import { toggleTheme } from '../actions'
import { connect } from 'react-redux'
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Button } from 'reactstrap'

class MyNavbar extends React.Component {
    state = {
        isOpen: true
    };

    toggleCollapse = (e) => {
        e.preventDefault();
        this.setState({ isOpen: this.state.isOpen });
    }

    toggleTheme = (e) => {
        console.log("toggleTheme");
        this.props.dispatch(toggleTheme());
    }

    render() {
        let theme = this.props.theme;
        return (
            <>
                <Navbar color={ theme.name } light expand="md">
                    <NavbarBrand href="/">
                        <span id="sitelogo"></span>
                        <span id="sitename"></span>
                    </NavbarBrand>
                    <NavbarToggler onClick={ this.toggleCollapse } />
                    <Collapse isOpen={ this.state.isOpen } navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={ this.toggleTheme }>Toggle theme</Button>
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
}

let mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(MyNavbar);
