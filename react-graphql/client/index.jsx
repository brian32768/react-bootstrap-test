import React from 'react'  // eslint-disable-line no-unused-vars
import { createRoot } from 'react-dom/client'
import App from './src/App.jsx' // eslint-disable-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css'

const domNode = document.getElementById("app");
const root = createRoot(domNode);

root.render(
    <>
        <App title="React GraphQL" />
    </>,
);
