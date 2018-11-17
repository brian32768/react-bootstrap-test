
// React
import React, { PropTypes } from 'react';
import ReactDOM from "react-dom";
import {Switch, Route, Link} from 'react-router-dom';

// React + Bootstrap
import {Navbar, Nav, NavItem, MenuItem, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

// My own components
import SpecialDay from './specialday';
import Pictures from './pictures';
import About from './about';
import Map from "./Map.js";

import './App.css';

class ToggleButton extends React.Component {
    // This toggle button switches pictures.
    // I wanted to experiment with a button that is outside
    // the Pictures component to see what it would take
    // to control another component.
    // A child component cannot send messages to a sibling,
    // so the parent has to install a handler here that can talk to Pictures
    constructor(props) {
        super(props);
        this.state = {isToggleOn:true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        this.props.switchpicture(this.state.isToggleOn);
    }
    render() {
        return (
            <button onClick={this.handleClick}>Toggle</button>
        );
    }
}

const App = ({children}) => {
    constructor() {
        super();
        this.state = {
            picture:  false,
            pictureid: 'normal_picturename',
            picturename: 'pigeon'
        }
        // Force the pictureSwitcher to stay in the context of this object.
        this.pictureSwitcher = this.pictureSwitcher.bind(this);
        this.gotFocus     = this.gotFocus.bind(this);
        this.lostFocus    = this.lostFocus.bind(this);
    }

    pictureSwitcher(alt) {
        // Called from the button component to switch the picture and footer text
        console.log("switch the picture");
        this.setState({
            picture: alt,
            picturename: alt? 'beaver':'pigeon'
        });
    }

    gotFocus() {
        this.setState({
            pictureid:  "em_picturename",
        });
    }

    lostFocus() {
        this.setState({
            pictureid:  "normal_picturename",
        });
    }

    render() {
        let footer = (<a
            onMouseOver={this.gotFocus} onMouseOut={this.lostFocus}>
            <span id={this.state.pictureid}>{this.state.picturename}</span>
            </a>);
        let p = Pictures;
        return (
            <div>
                    <h1>react-bootstrap-test</h1>

                    <Navbar className="navbar-top" fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to='/about'>About</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>

                        <Navbar.Collapse>
                            <Nav pullRight>
                                <IndexLinkContainer to='/'>
                                    <MenuItem>Pictures</MenuItem>
                                </IndexLinkContainer>
                                <IndexLinkContainer to='/map'>
                                    <MenuItem>Map</MenuItem>
                                </IndexLinkContainer>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>

                    <Grid fluid>
                    <Row>

                    <Col sm={3} md={2} className="sidebar">
                    <Nav stacked>
                        <ToggleButton switchpicture={this.pictureSwitcher} />
                    </Nav>
                    </Col>

                    <Col sm={9} smOffset={3} md={10} mdOffset={2} className="content">
                        {children}
                    </Col>

                    </Row>
                    </Grid>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node;
};

export default App;
// That's all!
