import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Map as olMap} from 'ol'
import {Layer as olLayer} from 'ol/layer'
import {OverviewMap} from 'ol/control'

const overviewMap = (layers) => {
    return new OverviewMap({
        layers,
        collapsed: false, collapsible: false
    });
}

const MyOverview = ({map, layers}) => {
    console.log("MyOverview");
    const [oview, setOview] = useState(overviewMap(layers))
    const setTarget = element => {
        console.log("MyOverview.setTarget");
        oview.setTarget(element);
        map.addControl(oview);
    }
    return (
        <div ref={setTarget}></div>
    );
}
MyOverview.propTypes = {
    map: PropTypes.instanceOf(olMap),
    layers: PropTypes.arrayOf(PropTypes.instanceOf(olLayer)),
}
export default MyOverview;
