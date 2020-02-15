import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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



export default function Routes() {
  return (
    <Switch>
      {/* TODO: make / route to a homepage */}
      <Route exact path='/home' component={StudentPage} />
      
      {/* <Route exact path='/students' component={StudentPage} /> */}

      <Route exact path='/students'
        render={props =>
          isLoggedIn() ? (
            <StudentPage/>
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />

      <Route exact path='/login' component={LoginPage} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}