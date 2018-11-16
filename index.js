import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './src/App.js';

// Mount the component onto the DOM in the div known as "app".
let mountNode = document.getElementById("app");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , mountNode);
