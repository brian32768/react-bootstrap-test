import React from 'react'  // eslint-disable-line no-unused-vars
import '../css/App.css'
import { Header, Home, Footer } from './components'

const App = ( {title} ) => {
    return (
        <>
            <Header/>
            <Home />
            <Footer />
        </>
    );
}
export default App;
