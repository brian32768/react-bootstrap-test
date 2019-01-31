import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from './actions'
import TasksPage from './TasksPage'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap'

// My own React components
import Table from './table'
import Pictures from './pictures'
import Home from './home'
import About from './about'
import Contact from './contact'
import NotFound from './notfound'

import {ThemeContext, themes} from './theme-context'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class PrimaryLayout extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.state = {
            isOpen: false,
            theme: themes.light
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
            <ThemeContext.Provider value={this.state.theme}>

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
                  <NavLink href="/">Map</NavLink>
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

            </ThemeContext.Provider>
        );
    }
}

class App extends Component {
    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({title, description}));
    }

    render() {
        console.log("App render() props=", this.props);
        return (
            <div className="main-content">
            <TasksPage
                tasks={ this.props.tasks }
                onCreateTask={ this.onCreateTask }
            />
            <BrowserRouter>
            <PrimaryLayout/>
            </BrowserRouter>
            </div>
        )
    }
}

// Map Redux state to component props
let mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        tasks: state.tasks
    }
};

// Connect the Redux datastore to the App.
export default connect(mapStateToProps)(App);
