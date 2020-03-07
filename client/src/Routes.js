import React from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";

import HomePage from './home-page/HomePage'
import StudentPage from './student-page/StudentPage';
import LoginPage from './login-page/LoginPage';
import Cookies from 'universal-cookie';


// const isLoggedIn = false; //AuthService.isLoggedIn()



const cookies = new Cookies();
// console.log(cookies.get('myCat')); // how to get it to read from the cookie created in LoginPage.js?

var isLoggedIn = function() {
  var b = cookies.get('loginSuccess');
  console.log("b: " + b);
  console.log("b == 'true':" + (b=='true'));
  console.log(cookies.getAll());
  return (b == "true")

}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('loginSuccess') === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
      //  <Redirect to='/login' render={(props) => <LoginPage {...props} showWarning={true}/>} />
  )} />
)


export default function Routes() {
  return (
    <Router>
      {/* TODO: make / route to a homepage */}
      <PrivateRoute exact path='/' component={HomePage} />
      {/* <PrivateRoute exact path='/students' component={StudentPage} /> */}
      <Route exact path='/students' component={StudentPage} />
      <Route exact path='/login' component={LoginPage} />
      {/* <Route component={NotFound} /> */}
    </Router>
  );
}