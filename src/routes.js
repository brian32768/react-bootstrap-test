import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { MyNavbar } from './components'
import { About, Contact, Home, NotFound, Pictures, Table, TasksPage } from './components'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

class Routes extends React.Component {
    render() {
        return (
            <>
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
            </>
        );
    }
}
export default Routes;
