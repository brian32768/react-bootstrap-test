// Map.js
//
import React from 'react';

// I can compose a map here with
// all its various controls such as zoom buttons and scalebars
// and wrap it inside the Map component.

class ScaleBar extends React.Component {
    render() {

        // There is a 'scalebar' class defined in App.css
        // that controls the style for a scale bar.
        return (
            <scalebar>
              <p>
                {this.props.children}
              </p>
            </scalebar>
        );
    }
}

class Map extends React.Component {
    render() {

        // There is a 'map' class defined in App.css
        // that controls the style for map contents.
        return (
            <map>
              <h2>Here's a map component</h2>
              <p>
                {this.props.children}
              </p>
              <ScaleBar>Scale: 100 miles</ScaleBar>
            </map>
        );
    }
}

// Put the ScaleBar into the Map namespace.
Map.ScaleBar = ScaleBar;

export default Map;

// That's all!
