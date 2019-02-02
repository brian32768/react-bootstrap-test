import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import deepmerge from 'deepmerge'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { connect } from 'react-redux'
import { createTask } from './actions'
import { MyNavbar } from './components'
import {About, Contact, Home, NotFound, Pictures, Table, TasksPage} from './components'
import 'bootstrap/dist/css/bootstrap.css'
import { uniqueId } from './actions'
import { themes } from './themes'
import './index.css'

const initialState = {
    theme: themes.dark,

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
    let newState;
    switch(action.type) {
        case 'TOGGLE_THEME':
            newState = {
                theme: (state.theme.name=='light')?
                    themes.dark : themes.light
            };
            return deepmerge(state, newState);
        case 'CREATE_TASK':
            newState = {
                tasks: state.tasks.concat(action.payload)
            };
            return deepmerge(state, newState);
    }
    console.log("Unrecognized action:", action.type, "; state not changed.");
    return state;
}

let store = createStore(reducer, initialState);
//    devToolsEnhancer({ trace: true, traceLimit: 25 }));

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
