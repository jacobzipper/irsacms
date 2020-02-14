import React from "react";
import { Route, Switch } from "react-router-dom";

import StudentPage from './StudentPage';
import LoginPage from './LoginPage';


export default function Routes() {
  return (
    <Switch>
      {/* TODO: make / route to a homepage */}
      <Route exact path='/home' component={StudentPage} />
      <Route exact path='/students' component={StudentPage} />
      <Route exact path='/login' component={LoginPage} />
      {/* <Route component={NotFound} /> */}
    </Switch>
    );
  }