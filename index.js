import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { tasks } from './src/reducers'
import App from './src/App'

let store = createStore(tasks,
    devToolsEnhancer({ trace: true, traceLimit: 25 }));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById("app")
);
