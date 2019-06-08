import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import configStore, { history } from './redux/configstore'
import Routes from './routes'
import { TickTock } from './components'
import { BrowserRouter } from 'react-router-dom'

const { store, persistor } = configStore();

//console.log("index.js=", process.env.SAMPLE_PASSWORD);

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={ <TickTock/> } persistor={ persistor }>
    <BrowserRouter><Routes /></BrowserRouter>
{/*        <ConnectedRouter history={ history }>
            <Routes />
        </ConnectedRouter>
        */}
    </PersistGate>
    </Provider>,
    document.getElementById("app")
);
