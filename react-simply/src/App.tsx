// App.tsx react-simply
//
import React from 'react'  // eslint-disable-line no-unused-vars
import './App.scss'
import { Navbar } from 'react-bootstrap'
import { SomeContent } from './components'

const App = () => {
    let url = (new URL('../assets/babyturtle.png?width=256', import.meta.url)).toString();
    return (
        <>
            <Navbar>
                <Navbar.Brand href="#home">
                    <img src={url}/>
                </Navbar.Brand>
            </Navbar>
            <h2>react-test</h2>
            <SomeContent/>
        </>
    )
}
export default App;
