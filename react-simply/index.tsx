import React from 'react';
import App from './src/App';
import { createRoot } from 'react-dom/client'

// React 18 format

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App/>);
