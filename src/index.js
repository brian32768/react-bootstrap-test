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
console.log(store.getState());

store.dispatch(createTask({
    title:"Learn more about Redux", description:"Expand the state." })
);
console.log(store.getState());

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
    <MyNavbar {...store} />
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home} />

        <Route  path="/table" store={ store }
            render={() =>
                <Table {...store.getState().theme} />}
        />

        <Route path="/pictures" store={ store }
            render={() =>
                <Pictures {...store.getState().theme} />}
        />

        <Route path="/about" store={ store }
            render={() =>
                <About {...store.getState().theme} />}
        />

        <Route path="/contact" store={ store }
            render={() =>
                <Contact {...store.getState().theme} />}
        />

        <Route path="/tasks" store={ store }
            render={() =>
                <TasksPage {...store.getState()} />}
        />

        <Route store={ store }
            render={() =>
                <NotFound  {...store.getState().theme} />}
        />

    </Switch>
    </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
