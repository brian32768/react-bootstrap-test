import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
//import { PersistGate } from 'redux-persist/integration/react'
import configStore from './redux/configstore'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { MyNavbar } from './components'
import { About, Contact, Home, NotFound, Pictures, Table, TasksPage } from './components'
import { createTask } from './redux/actions'
import { themes } from './themes'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const { store } = configStore();

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
