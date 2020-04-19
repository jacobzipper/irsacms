// TODO: URGENT
// redirect to this page if trying to access an admin only page
// while cookies.userType == 'user'


import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'
import Navbar from "../Navbar";

// TODO: refactor this as students page, and make app be the routing with navbar page
function PermissionDeniedPage() {
  return (
    <>
      <Container>
        <Jumbotron>
          <h1> Access Denied. </h1>
        </Jumbotron>
      </Container>
    </>
   
  );
}

export default PermissionDeniedPage;
