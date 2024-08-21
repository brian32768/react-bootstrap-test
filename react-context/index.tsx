import React from 'react';
import App from './src/App';

// React 18 format
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);
