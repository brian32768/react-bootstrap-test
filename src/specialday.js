// specialday.js
// Example of a component implemented as a function instead of a class;
// it celebrates Friday.
//
import React from "react";
import ReactDOM from "react-dom";

// I suspect this being declared statically means the day will never change
// without a page reload, but at the moment I am not worried about this.
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const ndayth = ["first","second","third","fourth","fifth","best","seventh"];
let nday = new Date().getDay(); // day as integer 0-6
let day = days[nday];

// Let's make the tooltip part of the component.
class TooltipContent extends React.Component {
    render() {
        return (
            <span>{day} is the {ndayth[nday]} day of the week.</span>
        );
    }
}

class SpecialDay extends React.Component {
    constructor() {
        super();
    }
    render() {
        if (nday == 5) {
            return (
                <b>Happy {day}!!!</b>
            );
        }
        return (
            <span>It's {day}.</span>
        );
    }
}

SpecialDay.TooltipContent = TooltipContent;

export default SpecialDay;
