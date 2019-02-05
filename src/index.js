import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { MyNavbar } from './components'
import {About, Contact, Home, NotFound, Pictures, Table, TasksPage} from './components'
import 'bootstrap/dist/css/bootstrap.css'
import { createTask } from './actions'
import { themes } from './themes'
import './index.css'

const store = createStore(reducer);

/*    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({title, description}));
    }

    tasks={ this.props.tasks }
    onCreateTask={ ({title, description}) => {
        this.props.dispatch(createTask({title, description}));
} />

    */

ReactDOM.render(
    <Provider store={store}>
    <MyNavbar />
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/table" component={ Table } />
    <Route path="/pictures" component={ Pictures } />
    <Route path="/about" component={ About } />
    <Route path="/contact" component={ Contact } />
    <Route path="/tasks" component={ TasksPage } />
    <Route render={() => <NotFound/> } />
    </Switch>
    </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
