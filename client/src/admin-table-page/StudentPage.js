import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import CustomerTable from './CustomerTable'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'


// TODO: refactor this as students page, and make app be the routing with navbar page
function StudentPage() {
  return (
  
    <Container>
      <Jumbotron>
        <h1>IRSA Client Management System, sprint 2</h1>
        <p>
          Welcome to the second prototype 
        </p>
        <p>
          Clicking on a row will pull up the interface that will allow you to edit a students
          information, contact them, or download their documents.
        </p>
      </Jumbotron>
    
      <CustomerTable />
      
    </Container>
    
   
  );
}

export default StudentPage;
