import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from "./Navbar";
import Routes from './Routes';


function App() {
  return (
    <Router>
        {/* This is the Navbar, add more links to places in the app here */}
        <Navbar /> 
        
        {/* Any new components/pages added need to have corresponding route
            added in this Routes component. */}
        <Routes />
    </Router>
  );
}


ReactDOM.render(<App />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
