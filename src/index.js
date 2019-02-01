import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import deepmerge from 'deepmerge'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Button } from 'reactstrap'
import { connect } from 'react-redux'
import { createTask } from './actions'
import {About, Contact, Home, NotFound, Pictures, Table, TasksPage} from './components'
import 'bootstrap/dist/css/bootstrap.css'
import { uniqueId } from './actions'
import { themes } from './theme-context'
import './index.css'

const initialState = {
    theme: themes.light,

    tasks: [
        {
            id: uniqueId(),
            title: 'Learn Redux',
            description: 'The store, actions, and reducers, oh my!',
            status: 'In Progress',
        },
        {
            id: uniqueId(),
            title: 'Peace on Earth',
            description: 'No big deal.',
            status: 'In Progress',
        },
    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_TASK':
            console.log("reducer CREATE_TASK");
            let newState = {
                tasks: state.tasks.concat(action.payload)
            };
            return deepmerge(state, newState);
    }
    console.log("Unrecognized action:", action.type, "; state not changed.");
    return state;
}

let store = createStore(reducer, initialState);
//    devToolsEnhancer({ trace: true, traceLimit: 25 }));

/*    toggle = () => {
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

    */

ReactDOM.render(
    <Provider store={store}>

    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <span id="sitelogo"></span>
        <span id="sitename"></span>
      </NavbarBrand>
      <Collapse isOpen={ true } navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
            <Button>Toggle theme</Button>
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

    <BrowserRouter>
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
                    onCreateTask={ ({ title, description }) => {
                            this.props.dispatch(createTask({title, description}));
                        }
                    }
                />
            );
        }} />
        <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);

/*
// Map Redux state to component props
let mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        tasks: state.tasks
    }
};

// Connect the Redux datastore to the app.
export default connect(mapStateToProps)(App);
*/
