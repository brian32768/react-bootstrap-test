// theme-context.js react-bootstrap-test
//
import React from 'react';

export const themes = {
    light: {
        name: 'light',
        foreground: '#000',
        background: '#eeeeee'
    },
    dark: {
        name: 'dark',
        foreground: '#fff',
        background: '#222222'
    }
};

export const ThemeContext = React.createContext(
    themes.dark
);
