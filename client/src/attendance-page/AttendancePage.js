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
        <h1>IRSA Client Management System, Sprint 4</h1>
        <p>
          Click on a row to see attendance of that student.
        </p>
        <p>
          Click on the checkboxes to select a student who attended todays class, and press "Update" at the bottom of the page to confirm attendance.
        </p>
      </Jumbotron>
    
      <AttendanceTable />
      
    </Container>
    </>
   
  );
}

export default AttendancePage;
