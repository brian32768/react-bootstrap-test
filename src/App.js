// App.js react-bootstrap-test
// This looks almost like JavaScript (um well some version of it, probably ES6)
// but really it's JSX so don't be confused by what appear to be strings of
// HTML strewn randomly into the ES6 source code. That's JSX.
//
import React from "react";
import ReactDOM from "react-dom";
import {Switch, Route, Link} from 'react-router-dom';
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

export default class App extends React.Component {
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
            <section>
                <header>
                    <h1>react-bootstrap-test</h1>

                    <button><Link to='/about'>About</Link></button>
                    <button><Link to='/'>Pictures</Link></button>
                    <button><Link to='/map'>Map</Link></button>
                </header>

                <Switch>
                    <Route exact path='/' component={p}/>
                    <Route path='/about' component={About}/>
                    <Route path='/map' component={Map}/>
                </Switch>

                <footer>
                    <ToggleButton switchpicture={this.pictureSwitcher} />
                    This {footer} says "<SpecialDay/>"
                </footer>
            </section>
        );
    }
}

// That's all!
