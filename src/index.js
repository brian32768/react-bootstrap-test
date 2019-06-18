import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configStore, { history } from './redux/configstore'
import { TickTock } from './components'
import App from './App'

const { store, persistor } = configStore();

//console.log("index.js=", process.env.SAMPLE_PASSWORD);

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={ <TickTock/> } persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById("app")
);
