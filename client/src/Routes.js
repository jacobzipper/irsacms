// framework imports
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// webpage imports
import HomePage from './home-page/HomePage'
import StudentPage from './student-page/StudentPage';
import LoginPage from './login-page/LoginPage';

// other stuff
import Cookies from 'universal-cookie';
const cookies = new Cookies();


// wrapper for <Route> component to make it impossible to access without auth cookie
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('loginSuccess').localeCompare('true') === 0 ?
      <Component {...props} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
        }} />
      
  )} />
)


/*
This component selectively renders the page components
based on current url path
*/
export default function Routes() {
  return (
    <Router>
        <PrivateRoute exact path='/' component={HomePage} />
        <PrivateRoute exact path='/students' component={StudentPage} />
        <Route exact path='/login' component={LoginPage} />
      </Router>
    
  );
}