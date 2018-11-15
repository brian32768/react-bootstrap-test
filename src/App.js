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
    constructor(props) {
        super(props);
        this.state = {
            logo: (<div id="bird_logo"></div>)
        }
    }
    render() {
        return <div> {this.state.logo} </div>
    }
}

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn:false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick}>
            {this.state.isToggleOn? 'ON' : 'OFF'}
            </button>
        );
    }
}

export default class AppComponent extends React.Component {
    constructor() {
        super();
    }

    logoSwitcher() {
        console.log('switch logo', this.state.showLogo);
        return <p>some text goes here</p>
    }

    render() {
        let words = <span> {this.props.footer} says "<SpecialDay/>"</span>
        //let mylogo = ReactDOM.render(<AppLogo />, document.getElementById("logo"));
        return (
        <div>
            <section>
                <header>
                    <h1>react-bootstrap-test</h1>
                    <div id="logo"><AppLogo /></div>
                </header>

                <main>
                    <Map><h1>Eventually, a map will go here.</h1></Map>
                    <DescriptionBlock>This is a descriptive block.</DescriptionBlock>
                    <br />
                    <ToggleButton/>
                </main>

                <footer>
                    { words }
                </footer>
            </section>
        </div>
        );
    }
}

// That's all!
