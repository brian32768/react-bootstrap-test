import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'; // eslint-disable-line no-unused-vars
import {PersistGate} from 'redux-persist/integration/react'
import configStore from './configstore'
import {TickTock} from './src/components'
import App from './App'; // eslint-disable-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css'

const {store, persistor} = configStore();

/*
console.log("index.js=", process.env.SAMPLE_PASSWORD);
<PersistGate loading={<TickTock/>} persistor={persistor}>
</PersistGate>
*/

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
