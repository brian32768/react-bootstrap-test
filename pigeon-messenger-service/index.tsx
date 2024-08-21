import React from 'react'
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './src/App';

const container = document.getElementById('app');
/*const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);*/

<>
<App/>
</>