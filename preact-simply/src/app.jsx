import {useState} from 'preact/hooks'
import { Router } from 'preact-router'
import { Link } from 'preact-router/match'
import { Home, ControlledForm, UncontrolledForm, Act, Login } from './routes'
import { Navbar } from 'preact-bulma'
import "bulma/css/bulma.min.css";
import './app.css'

export const App = () => {
    const [ username, setUsername ] = useState('(not logged in)');

    // Lifting State
    // Pass this function to the input forms, 
    // when they change the value of user then
    // this function will change the value of "username"
    // which then gets passed down to the Login component.
    const handleLogin = (user) => {
        setUsername(user);
        alert(`Logging you in now, ${user}`);
    }

    return (
        <>
        <Navbar.Navbar>
          <Navbar.Menu>
            <Navbar.MenuItem>
              <Link activeClassName="active" href="/">Home</Link>
            </Navbar.MenuItem>
            <Navbar.MenuItem>
            <Link activeClassName="active" href="/form1">Form 1</Link>
            </Navbar.MenuItem>
            <Navbar.MenuItem>
            <Link activeClassName="active" href="/form2">Form 2</Link>
            </Navbar.MenuItem>
          </Navbar.Menu>
        </Navbar.Navbar>
        <Router>
          <Home path='/'/>
          <ControlledForm path="/form1"/>
          <UncontrolledForm path="/form2"/>
          <Login path="/login"/>
        </Router>
        </>
    )
}
