import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Page extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>IRSACMS </h2>
            <ul>
              <li> <Link to="/"> Students</Link></li>
              <li> <Link to="/login"> Login</Link></li>
            </ul>

            <Route exact path='/' component={App} />
            <Route path='/login' component={Login} />
        </div>
      </Router>
    )
  }
}

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Page />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
