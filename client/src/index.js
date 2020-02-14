import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import { Nav, Navbar} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Routes from './Routes';

class Page extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* Navigation Bar with Routes */}
          <Navbar bg="dark" variant="dark" expand="lg">
            {/* Nav bar properties for responsiveness (i think ?)  */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* Navbar elements that link to places */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>

                <LinkContainer to="/home">
                  <Nav.Link>IRSA Client Manager</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/students">
                  <Nav.Link> Students </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/login">
                  <Nav.Link> Login </Nav.Link>
                </LinkContainer> 

              </Nav>
            </Navbar.Collapse>

          </Navbar>

          {/* ACTUAL pages that are routed to */}
          <Routes />

          
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
