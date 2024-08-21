// App.tsx react-simply
import React from 'react'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './App.scss'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Home, MyForm, MyLink, Act, Login } from './components'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { format, parseISO } from "date-fns";

const fieldStyle = {
  marginTop: "20px",
  float: "left",
  width: "70%",
  fontSize: 20
};
const buttonStyle = {
  marginTop: "20px",
  backgroundColor: "lightBlue",
  width: "30%",
  fontSize: 20,
  cursor: "pointer",
  marginRight: "20px"
};

const App = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [display, setDisplay] = useState("");
  
    // Parcel will preprocess this image file and bundle only the thumbnail.
    let url = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
    let SomeContent = Home;

    const handleLogin = (user : string) => {
        setName(user);
        alert(`Logging you in now, ${user}`);
    }
    const submit = () => {
      axios
        .post(`https://reqres.in/api/users`, { name: name, job: role })
        .then((res) => {
          setDisplay(
            `${name} is appointed as ${role} on ${format(
              parseISO(res.data.createdAt),
              "dd-MMM-yyyy"
            )} with ID ${res.data.id}`
          );
          console.log(res.data);
        });
    };
    const getManagerName = () => {
      axios.get(`https://reqres.in/api/users/2`).then((res) => {
        console.log(res.data);
        setDisplay(
          `${res.data.data.first_name} is the manager. The contact  email is  ${res.data.data.email}.`
        );
      });
    };

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
                <Nav.Link><Login username={name} /></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
                <h2>react-api-demo</h2>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/form" element={<MyForm onLogin={handleLogin}/>} />
                    <Route path="/link" element={<MyLink />} />
                    <Route path="/action/:act" element={<Act />} />
                </Routes>
            <br />
        </Router>

        <div style={{ width: "100%" }}>
        <input
            placeholder="Name"
            value={name}
            style={fieldStyle}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            placeholder="Role"
            value={role}
            style={fieldStyle}
            onChange={(e) => setRole(e.target.value)}
        />
        <button style={buttonStyle} onClick={submit}>
            Submit
        </button>

        <button style={buttonStyle} onClick={getManagerName}>
            Get Manager name
        </button>
        <br />
        {display && <label style={fieldStyle}> {display}</label>}
        </div>
      </>
    )
}
export default App;