// App.tsx react-redux-first
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as components from './components'

const App = ({ page }) => {
  // Parcel will preprocess this image file and bundle only the thumbnail.
  let url = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
  const Page = components[page];
  return (<>
    <Container>
      <h1>react-redux-first</h1>
      <Navbar>
        <Navbar.Brand href="/">
          <img src={url} />
        </Navbar.Brand>
        <Nav.Link href="/User/123">User:123</Nav.Link>
        <Nav.Link href="/User/Brian">User:Brian</Nav.Link>
        <Nav.Link href="/solr/q=Irving">Solr search</Nav.Link>
        <Nav.Link href="/swapi/people/1/">Test SW api</Nav.Link>
        <Nav.Link href="/swapi/people/1/">Test SW api</Nav.Link>
      </Navbar>

      <Page />
    </Container>
  </>);
}

const mapStateToProps = ({ page }) => ({ page })
export default connect(mapStateToProps)(App)
