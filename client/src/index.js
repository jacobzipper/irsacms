import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from "./Navbar";
import StudentPage from './student-page/StudentPage';
import LoginPage from './login-page/LoginPage';


function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <Router>
        {/* This is the Navbar, add more links to places in the app here */}
        <Navbar /> 

        <Switch>
          {/* TODO: make / route to a homepage */}
          <Route exact path='/' component={StudentPage} />
          <Route exact path='/students' component={StudentPage} />
          <Route exact path='/login' component={LoginPage} />
          {/* <Route component={NotFound} /> */}
      </Switch>

    </Router>
  );
}


ReactDOM.render(<App />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();