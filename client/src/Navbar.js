import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Button} from "react-bootstrap";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const logout = () => {
  cookies.set('loginSuccess', 'false', { path: '/' });
  cookies.set('userType', 'user', { path: '/' });
  cookies.set('username', '', { path: '/' });
}

export default function NavBar() {
  let userType = cookies.get('userType');
  if(userType && userType.localeCompare('admin') === 0) {
    return (

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav> 
          {/* Add Link Containers in this Nav*/}
            <LinkContainer to="/">
              <Nav.Link>IRSA Client Manager</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/students">
              <Nav.Link> Students </Nav.Link>
            </LinkContainer>
  
            <LinkContainer to="/attendance">
              <Nav.Link> Attendance </Nav.Link>
            </LinkContainer>
  
            {/* <LinkContainer to="/YOURPATHHERE">
              <Nav.Link> YOUR PAGE HERE </Nav.Link>
            </LinkContainer> */}

          </Nav>
  
          <Nav className="justify-content-end" justify="true">
            <LinkContainer to="/login">
              <Button variant="dark" onClick={logout}>Logout</Button>
            </LinkContainer>
          </Nav>
  
          
  
        </Navbar.Collapse>
      </Navbar>  
      
    );
  } else {
    // TODO: URGENT
    // return the user version of Navbar
    return (

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav> 
          {/* Add Link Containers in this Nav*/}
            <LinkContainer to="/">
              <Nav.Link>IRSA Student Portal</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/attendance">
              <Nav.Link> Attendance </Nav.Link>
            </LinkContainer>
  
            {/* <LinkContainer to="/YOURPATHHERE">
              <Nav.Link> YOUR PAGE HERE </Nav.Link>
            </LinkContainer> */}

          </Nav>
  
          <Nav className="justify-content-end" justify="true">
            <LinkContainer to="/login">
              <Button variant="dark" onClick={logout}>Logout</Button>
            </LinkContainer>
          </Nav>
  
          
  
        </Navbar.Collapse>
      </Navbar>  
      
    );

  }
  
}
