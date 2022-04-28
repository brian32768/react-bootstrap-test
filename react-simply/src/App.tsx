// App.tsx react-simply
import React from 'react'  // eslint-disable-line no-unused-vars
import './App.scss'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { SomeContent } from './components'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    // Parcel will preprocess this image file and bundle only the thumbnail.
    let url = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
    return (
        <>
        <Navbar>
                <Navbar.Brand href="/">
                    <img src={url} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            I don't suppose a picture of a baby turtle makes a good logo for a navbar, yet here it is.
        <h2>react-simply</h2>
            <SomeContent />
            <br />
        </>
    )
}
export default App;
