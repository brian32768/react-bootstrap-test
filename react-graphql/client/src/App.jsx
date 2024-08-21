<<<<<<< HEAD
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
=======
import React from 'react'
import Apollo from './apollo'
import '../css/App.css';


function App() {
  return (
    <>
    <Apollo/>
    </>
  );
}

export default App;
>>>>>>> refs/remotes/origin/master
