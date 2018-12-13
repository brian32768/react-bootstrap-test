// App.js react-bootstrap-test
// All this functional component does is declare the user interface.
// The real work is done in components included here.

// React
import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom';
import {ThemeContext, themes} from './theme-context';
import {MapContext} from './map-context';

// Bootstrap (reactstrap in this case)
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

// My own React components
import SpecialDay from './specialday';
import Table from './table';
import Pictures from './pictures';
import Home from './home';
import About from './about';
import Contact from './contact';
import NotFound from './notfound';

import './App.css';

class PrimaryLayout extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.state = {
            isOpen: false,
            theme: themes.light,
            map: ''
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleTheme() {
        this.setState({
            theme: (this.state.theme.name=="dark")? themes.light : themes.dark
        });
    }

    render() {
        console.log("App render", this.props, this.state);
        return (
          <div>
          <ThemeContext.Provider value={this.state.theme}>
          <MapContext.Provider value={this.state.map}>

            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">
                <span id="sitelogo"></span>
                <span id="sitename"></span>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button onClick={this.toggleTheme}>Toggle theme</Button>
                </NavItem>
                <NavItem>
                  <NavLink href="/table">Table</NavLink>
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

            <Switch>
                <Route exact path="/"         component={Home} />
                <Route       path="/table"    component={Table} />
                <Route       path="/pictures" component={Pictures} />
                <Route       path="/about"    component={About} />
                <Route       path="/contact"  component={Contact} />
                <Route       path="/404"      component={NotFound} />
                <Redirect to="/404" />
            </Switch>

        </MapContext.Provider>
        </ThemeContext.Provider>
        </div>
        );
    }
}

const App = () => (
    <BrowserRouter>
    <PrimaryLayout/>
    </BrowserRouter>
)
export default App;

console.log('App loaded.')
