// App.js react-bootstrap-test
// This looks almost like JavaScript (um well some version of it, probably ES6)
// but really it's JSX so don't be confused by what appear to be strings of
// HTML strewn randomly into the ES6 source code. That's JSX.
//
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import SpecialDay from './specialday';
import Map from "./Map.js";

class DescriptionBlock extends React.Component {
    render() {
        return <div id="desc">
            This is an example of a <em>React</em> app written to test Parcel and React and Bootstrap
            (using the react-bootstrap node package).
        </div>
    }
}

class AppLogo extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div id={this.props.logoclass}></div>
    }
}

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn:true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        this.props.switchlogo(this.state.isToggleOn);
    }
    render() {
        return (
            <button onClick={this.handleClick}>
            {this.state.isToggleOn? 'HIDE' : 'SHOW'}
            </button>
        );
    }
}

export default class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            logoname:  "pigeon",
            logoclass: "bird_logo"
        }
        // Force the logoSwitcher to stay in the context of this object.
        this.logoSwitcher = this.logoSwitcher.bind(this);
    }

    logoSwitcher(use_beaver) {
        // Called from the button component to switch the logo and footer text
        this.setState({
            logoname:  use_beaver?"beaver" :"proud pigeon",
            logoclass: use_beaver?"beaver_logo":"bird_logo"
        });
    }

    render() {
        let footer = <footer> This {this.state.logoname} says "<SpecialDay/>" </footer>
        return (
        <div>
            <section>
                <header>
                    <h1>react-bootstrap-test</h1>
                    <AppLogo logoclass={this.state.logoclass}/>
                </header>

                <main>
                    <Map><h1>Eventually, a map will go here.</h1></Map>
                    <DescriptionBlock>This is a descriptive block.</DescriptionBlock>
                    <br />
                    <ToggleButton switchlogo={this.logoSwitcher} />
                </main>

                {footer}
            </section>
        </div>
        );
    }
}

// That's all!
