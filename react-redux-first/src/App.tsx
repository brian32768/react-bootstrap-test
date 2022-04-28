// App.tsx react-redux-first
import React from 'react'
import './App.scss'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as components from './components'

const App = ({ page }) => {
  const Page = components[page];
  return (<>
    <h1>thunks</h1>
    <Navbar>
      <Navbar.Brand href="/">react-redux-first</Navbar.Brand>
      <Nav.Link href="/User/123">User:123</Nav.Link>
      <Nav.Link href="/User/Brian">User:Brian</Nav.Link>
      <Nav.Link href="/solr/q=Irving">Solr search</Nav.Link>
      <Nav.Link href="/swapi/people/1/">Test SW api</Nav.Link>
    </Navbar>
    <Page />
  </>);
}

const mapStateToProps = ({ page }) => ({ page })

export default connect(mapStateToProps)(App)
