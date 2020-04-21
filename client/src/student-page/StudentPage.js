import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import CustomerTable from './CustomerTable'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'
import Navbar from "../Navbar";

import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function StudentPage() {
  let userType = cookies.get('userType');

  if(!userType || userType.localeCompare('admin') !== 0) {
    return <Redirect to={{
      pathname: '/permissionDenied',
      state: {}
      }} />
  }

  return (
    
    <>
    <Navbar/>
    <Container>
      <Jumbotron>
        <h1>IRSA Client Management System</h1>
        <p>
          Clicking on a row will pull up the interface that will allow you to edit a students
          information, contact them, or download their documents.
        </p>
      </Jumbotron>
    
      <CustomerTable />
      
    </Container>
    </>
  
  );
  
  
}

export default StudentPage;
