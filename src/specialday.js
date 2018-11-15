// specialday.js
// Example of a component implemented as a function instead of a class;
// it celebrates Friday.
//
import React from "react";
import ReactDOM from "react-dom";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default () => {
    let nday = new Date().getDay(); // day as integer 0-6
    let day = days[nday];
    if (nday == 5) {
        return <b>Happy {day}!!!</b>
    }
    return <span>It's {day}.</span>
};
