import React from "react"; // eslint-disable-line no-unused-vars

// I suspect this being declared statically means the day will never change
// without a page reload, but at the moment I am not worried about this.
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const ndayth = ["first","second","third","fourth","fifth","best","seventh"];
let nday = new Date().getDay(); // day as integer 0-6
let day = days[nday];

// Let's make the tooltip part of the component.
const TooltipContent = () => (
    <span>{day} is the {ndayth[nday]} day of the week.</span>
);

const SpecialDay = () => {
    return (nday == 5)?
        (<b>Happy {day}!!!</b>) :
        (<span>It's {day}.</span>)
}

SpecialDay.TooltipContent = TooltipContent;

export default SpecialDay;
