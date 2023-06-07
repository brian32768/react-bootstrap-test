import React from 'react'
import { Provider } from 'react-redux'
import App from './src/App'
import { createRoot } from 'react-dom/client'

import configureStore from './src/configureStore'
const { store } = configureStore()

// React 18 format

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
