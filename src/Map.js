import React from 'react';

// I can compose a map here with
// all its various controls such as zoom buttons and scalebars
// and wrap it inside the Map component.

import ScaleBar from './scalebar';

export default class Map extends React.Component {
    render() {

        // There is a 'map' class defined in App.css
        // that controls the style for map contents.
        return (
            <map>
              <h2>Here's a map component</h2>
              <p>
                {this.props.children}
              </p>
              <ScaleBar>Scale: 1000 miles</ScaleBar>
            </map>
        );
    }
}
