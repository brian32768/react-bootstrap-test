// App.js
// This looks almost like JavaScript (um well some version of it, probably ES6)
// but really it's JSX so don't be confused by what appear to be strings of
// HTML strewn randomly into the ES6 source code. That's JSX.
//
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import Map from './Map.js';

let clickHandler = function(evt) {
    console.log("Click!");
}

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
        return <desc>
            This is an example of a <em>React</em> app written to test Parcel and React and Bootstrap
            (using the react-bootstrap node package).
        </desc>
    }
}
// Define a new React component.
class BootstrapComponent extends React.Component {
  render() {
      return <div>
      <section>

      <header>
        <h1>react-bootstrap-test</h1>
        <div id="logo">css loads a picture here</div>
      </header>

      <main>
        <Map>A map will go here.</Map>
        <desc>This is a descriptive block.</desc>
        <br />
        <button>Click here now.</button>
      </main>

      <footer>
        {this.props.footer}
      </footer>

      </section>
    </div>;
  }
}

// Mount the component onto the DOM in the div known as "app".
let mountNode = document.getElementById("app");
ReactDOM.render(<BootstrapComponent footer="A pigeon" />, mountNode);
//console.log('tags', Object.keys(React.DOM).sort());

// That's all!
