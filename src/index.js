import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import configStore from './redux/configstore'
import { history } from './redux/reducers'
import Routes from './routes'
import { TickTock } from './components'

const { store, persistor } = configStore();

//console.log("index.js=", process.env.SAMPLE_PASSWORD);

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={ <TickTock/> } persistor={ persistor }>
        <ConnectedRouter history={ history }>
            <Routes />
        </ConnectedRouter>
    </PersistGate>
    </Provider>,
    document.getElementById("app")
);
