import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from './actions'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Button } from 'reactstrap'
import {About, Contact, Home, NotFound, Pictures, Table, TasksPage} from './components'
import {ThemeContext, themes} from './theme-context'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class PrimaryLayout extends Component {
    state = {
        isOpen: false,
        theme: themes.light
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleTheme = () => {
        this.setState({
            theme: (this.state.theme.name=="dark")? themes.light : themes.dark
        });
    }

    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({title, description}));
    }

    render() {
        console.log("PrimaryLayout() render", this.props, this.state);
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

            <Switch>
                <Route exact path="/"         component={Home} />
                <Route       path="/table"    component={Table} />
                <Route       path="/pictures" component={Pictures} />
                <Route       path="/about"    component={About} />
                <Route       path="/contact"  component={Contact} />

                <Route path="/tasks" render={() => {
                    return (
                        <TasksPage
                            tasks={ this.props.tasks }
                            onCreateTask={ this.onCreateTask }
                        />
                    );
                }} />
                <Route component={NotFound} />
            </Switch>

            </ThemeContext.Provider>
        );
    }
}


class App extends Component {
    render() {
        return (
            <>
            <BrowserRouter>
            <PrimaryLayout dispatch={this.props.dispatch} tasks={this.props.tasks}/>
            </BrowserRouter>
            </>
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

// Connect the Redux datastore to the app.
export default connect(mapStateToProps)(App);
