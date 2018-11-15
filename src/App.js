// App.js react-bootstrap-test
// This looks almost like JavaScript (um well some version of it, probably ES6)
// but really it's JSX so don't be confused by what appear to be strings of
// HTML strewn randomly into the ES6 source code. That's JSX.
//
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import Map from "./Map.js";

// Since this is not exported, it's not visible outside this module.
function getDatestamp() {
    // Return a string containing the timestamp for "now".
    let d = new Date();
    return d.toLocaleString();
}

//function intervalHandler(evt) {
//    document.getElementById('').innerHTML = getDatestamp();
//}
//let timed = setInterval(intervalHandler, 1000);

class DescriptionBlock extends React.Component {
    render() {
        return <div id="desc">
            This is an example of a <em>React</em> app written to test Parcel and React and Bootstrap
            (using the react-bootstrap node package).
        </div>
    }
}

const days = ["Sunday","Monday","Tuesday","Wednesday","Thurdsay","Friday","Saturday"];

class SpecialDay extends React.Component {
    render() {
        let item = this.props.item;
        let day = days[item];
        if (item == 5) {
            item = <b>Happy {day}!!!</b>
        } else {
            item = <span>It's {day}.</span>
        }
        return <span>{item}</span>
    }
}

class AppLogo extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div> logo </div>
    }
}

class ButtonComponent extends React.Component {
    render() {
        return <button onClick={this.props.clickHandler}>{this.props.text}</button>
    }
}

//({text,clickHandler} => <button onClick={clickHandler}>{text}</button>);

class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = { 'showLogo' : false };
    }

    clickHandler() {
        this.state.showLogo = !this.state.showLogo;
        console.log("click!", this.state.showLogo);
    }

    logoSwitcher() {
        console.log('switch logo', this.state.showLogo);
        return <p>some text goes here</p>
    }

    componentWillUpdate() {
        console.log('indeed')
    }

    render() {
        let words = <span> {this.props.footer} says "<SpecialDay item={new Date().getDay()}/>"</span>
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
                    <ButtonComponent clickHandler={()=>this.clickHandler()} text="Click here."/>
                </main>

                <footer>
                    { words }
                </footer>
            </section>
        </div>
        );
    }
}

// Mount the component onto the DOM in the div known as "app".
let mountNode = document.getElementById("app");
ReactDOM.render(<AppComponent footer="This pigeon" />, mountNode);

// That's all!
