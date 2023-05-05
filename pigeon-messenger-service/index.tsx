import React from 'react'
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import configStore from './src/configstore';

import App from './src/App';

const { store, persistor } = configStore();

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);