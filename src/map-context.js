import React from 'react'
export const MapContext = React.createContext({
    name: "",
    map: null,
    addControl: () => {}
});
