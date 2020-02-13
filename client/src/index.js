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

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Page extends Component {
  render() {
    return (
      <Router>

        <div>
          {/* Navigation Bar with Routes */}
          <Navbar bg="light" expand="lg">

            {/* Navbar elements that links to home */}
            <Navbar.Brand> <Link to="/"> IRSACMS </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* Things in here will collapse if viewport is smol */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link> <Link to="/"> Students </Link> </Nav.Link>
                <Nav.Link> <Link to="/login"> Login </Link> </Nav.Link>
              </Nav>
            </Navbar.Collapse>

          </Navbar>


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
