// Map.js react-bootstrap-test
//
import React from 'react';

// I can compose a map here with
// all its various controls such as zoom buttons and scalebars
// and wrap it inside the Map component.

class LoadJSON extends React.Component {
    render() {
        // Well this is certainly one way to get an asset
        // into the app with parcel. Not what I wanted but interesting.
        // The asset is actually loaded at compile time so it
        // becomes part of the bundle.
        // Since this file has a json extension, the 'require' function
        // will parse it and return a JavaScript object.
        let json = require('/assets/web_map_simple.json');

        // I can use the stringfy method to make it text.
        return (<pre> {JSON.stringify(json, null, 3)} </pre>)
    }
}

class FetchJSON extends React.Component {
    // Fetch the contents of a remote JSON file and show it.
    constructor() {
        super();
        this.state = {'map': {'error':'could not read remote url, check console'}};

        const url = "https://map46.com/assets/web_map_simple.json";
        fetch(url)
        .then(response => response.json())
        .then(rval => {this.setState({'map':rval})})
        .catch(err => console.log("Fetch error", url, err))
    }
    render() {
        // I can use the stringfy method to make it text.
        // This gets called once when the object is instantiated
        // and again when the fetch completes.
        return (<pre> {JSON.stringify(this.state.map, null, 3)} </pre>)
    }
}

class Map extends React.Component {
    render() {
        // There is a 'map' class defined in App.css
        // that defines the style for map contents.
        return (
            <div id="map">
              {this.props.children}
              
              <ScaleBar>Scale: 100 miles</ScaleBar>
            </div>
        );
    }
}

class ScaleBar extends React.Component {
    render() {

        // There is a 'scalebar' class defined in App.css
        // that defines the style for a scale bar.
        return (
            <div id="scalebar">
              <p>
                {this.props.children}
              </p>
            </div>
        );
    }
}

// Put the ScaleBar into the Map namespace.
Map.ScaleBar = ScaleBar;

export default Map;

// That's all!
