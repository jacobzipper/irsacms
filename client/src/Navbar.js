import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar} from "react-bootstrap";

// note: need to call it NavBar instead of Navbar because of import 'Navbar"
// from react bootstrap. However, this is not necessary outside of this module.
export default function NavBar() {
  return (

    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav>
          <LinkContainer to="/">
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
    
  );
}
