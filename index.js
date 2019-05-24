import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
//import { PersistGate } from 'redux-persist/integration/react'
import configStore from './src/redux/configstore'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { About, Contact, Home, MyNavbar, NotFound, Pictures, Table, TasksPage } from './src/components'
import { createTask } from './src/redux/actions'
import { themes } from './src/themes'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const { store, persistor } = configStore();

console.log("index.js=", process.env.SAMPLE_PASSWORD);

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
