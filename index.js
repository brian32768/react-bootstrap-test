import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configStore, { history } from './src/redux/configstore'
import { About, Contact, Home, MyNavbar, NotFound, Pictures, Table, TasksPage } from './src/components'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const { store, persistor } = configStore();

console.log("index.js=", process.env.SAMPLE_PASSWORD);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={ history }>
            <MyNavbar />
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/table" component={ Table } />
                <Route path="/pictures" component={ Pictures } />
                <Route path="/about" component={ About } />
                <Route path="/contact" component={ Contact } />
                <Route path="/tasks" component={ TasksPage } />
                <Route render={() => <NotFound/> } />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
);
