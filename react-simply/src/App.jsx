import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Nav, Dropdown } from "react-bootstrap"
import NavItem from "react-bootstrap/NavItem"
import { Home, ControlledForm, UncontrolledForm, DropZone, Act, Login } from './components'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = () => {
    // Parcel will preprocess this image file and bundle only the thumbnail.
    let turtleUrl = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
    let SomeContent = Home;
    const [ username, setUsername ] = useState('(not logged in)');

    const handleLogin = (user) => {
        setUsername(user);
        alert(`Logging you in now, ${user}`);
    }

    return (
        <>
        <Router>
            <img src={turtleUrl} />

            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                <Nav.Link href="/form1">Controlled form</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                <Nav.Link href="/form2">Uncontrolled form</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                <Nav.Link href="/drop">Drag and drop</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                <Dropdown>
                    <Dropdown.Toggle>More stuff</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/action/3.1">act 1</Dropdown.Item>
                        <Dropdown.Item href="/action/3.2">act 2</Dropdown.Item>
                        <Dropdown.Item href="/action/3.3">act 3</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/action/3.4">epilogue</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link><Login username={username} /></Nav.Link>
                </Nav.Item>
            </Nav>

                <h2>react-simply</h2>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/form1" element={<ControlledForm onLogin={handleLogin}/>} />
                    <Route path="/form2" element={<UncontrolledForm firstname={username} setFirstname={setUsername}/>} />
                    <Route path="//drop" element={<DropZone />} />
                    <Route path="/action/:act" element={<Act />} />
                </Routes>
            <br />
        </Router>

        <span className="TestOswald">
        This is Oswald. 
        </span>
        <span className="TestBarlow">
            This is Barlow
        </span>

        </>
    )
}
export default App;
