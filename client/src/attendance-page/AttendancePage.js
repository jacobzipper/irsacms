import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import AttendanceTable from './AttendanceTable'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'
import Navbar from "../Navbar";

// TODO: refactor this as students page, and make app be the routing with navbar page
function AttendancePage() {
  return (
    
    <>
    <Navbar/>
    <Container>
      <Jumbotron>
        <h1>IRSA Client Management System, sprint 4</h1>
        <p>
          Welcome to the second second prototype 
        </p>
        <p>
          Click on the boxes to select students who attended
        </p>
      </Jumbotron>
    
      <AttendanceTable />
      
    </Container>
    </>
   
  );
}

export default AttendancePage;
