import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'
import Navbar from "../Navbar";

import Cookies from 'universal-cookie';

let cookies = new Cookies();

// TODO: refactor this as students page, and make app be the routing with navbar page
function HomePage() {
  let userType = cookies.get('userType') && cookies.get('userType').localeCompare('admin') === 0 ? "Admin" : "User";
  
  return (
    <>
      <Navbar/>

      <Container>
        <Jumbotron>
          <h1> Welcome to the IRSA {userType} Portal! </h1>
        </Jumbotron>
      </Container>
    </>
   
  );
}

export default HomePage;
