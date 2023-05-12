// App.tsx react-simply
import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './App.scss'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Home, MyForm, MyLink, Act, Login } from './components'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    // Parcel will preprocess this image file and bundle only the thumbnail.
    let url = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
    let SomeContent = Home;
    return (
        <>
        <Router>
        <Navbar>
            <Navbar.Brand href="/">
                <img src={url} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/form">My form</Nav.Link>
                <Nav.Link href="/link">My link</Nav.Link>
                <NavDropdown title="More stuff" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/action/3.1">act 1</NavDropdown.Item>
                    <NavDropdown.Item href="/action/3.2">act 2</NavDropdown.Item>
                    <NavDropdown.Item href="/action/3.3">act 3</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/action/3.4">epilogue</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link><Login/></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
                <h2>react-simply</h2>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/form" element={<MyForm />} />
                    <Route path="/link" element={<MyLink />} />
                    <Route path="/action/:act" element={<Act />} />
                </Routes>
            <br />
        </Router>
        </>
    )
}
export default App;
