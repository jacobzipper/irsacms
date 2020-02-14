import React from "react";
import { Route, Switch } from "react-router-dom";

import App from './App';
import Login from './Login';


export default function Routes() {
  return (
    <Switch>
      {/* TODO: make / route to a homepage */}
      <Route exact path='/home' component={App} />
      <Route exact path='/students' component={App} />
      <Route exact path='/login' component={Login} />
      {/* <Route component={NotFound} /> */}
    </Switch>
    );
  }