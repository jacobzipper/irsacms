import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from "./Navbar";
import StudentPage from './student-page/StudentPage';
import LoginPage from './login-page/LoginPage';
import HomePage from './home-page/HomePage';

import Routes from './Routes'

import Cookies from 'universal-cookie';
import { DropdownDivider } from 'react-bootstrap/Dropdown';
const cookies = new Cookies();


var isLoggedIn = function() {
  var b = cookies.get('loginSuccess');
  console.log("b: " + b);
  console.log("b == 'true':" + (b=='true'));
  console.log(cookies.getAll());
  return (b == "true")

}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
      //  <Redirect to='/login' render={(props) => <LoginPage {...props} showWarning={true}/>} />
  )} />
)

function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <Router>
      <Navbar/>
      {/* TODO: make / route to a homepage */}
      <PrivateRoute exact path='/' component={HomePage} />
      <PrivateRoute exact path='/students' component={StudentPage} />
      <Route exact path='/login' component={LoginPage} />
      {/* <Route component={NotFound} /> */}
    </Router>
  );
}


ReactDOM.render(<App />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();