import React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import AttendanceTable from './AttendanceTable'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container'
import Navbar from "../Navbar";
import { Button, Row, Col, Form} from "react-bootstrap";
import crypto from "crypto";
// const crypto = require('crypto')

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// TODO: refactor this as students page, and make app be the routing with navbar page



class AttendancePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: "",                // credential field
      username: this.props.username
    };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCodeChange(event) {
    this.setState({code: event.target.value});
  }

  
  handleSubmit(event) {
    event.preventDefault();
    let username = cookies.get('username');
    let credentials = {username: username, code: this.state.code};
    console.log(credentials)
    fetch("/api/studentattendance", {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
    .then( res => res.json() )
    .then( res => {
      if(res.error == 1) {
        // alert("Incorrect Code.")
        alert("Attendance succesfully updated.")
      } else {
        alert("Attendance succesfully updated.")
      }

    });
    
  } //handleSubmit()

  render() {

    let userType = cookies.get('userType');
    let code = crypto.createHash('md5').update(new Date().toLocaleString().split(',')[0]).digest("hex").substring(0, 4);
    if(!userType || userType.localeCompare('admin') !== 0) {
      return (
        <>
          <Navbar/>

            <Container>
              <p> <br/></p> {/* <---- TODO: what is non hack way to do this ?? */}
              <h1>Please type in todays attendance code to register attendance.</h1>
              <Jumbotron>
                <Row>
                  <Col />
                  <Col xs={6}>

                    <Form onSubmit={this.handleSubmit}>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Attendance Code</Form.Label>
                        <Form.Control placeholder="1234" value={this.state.code} onChange={this.handleCodeChange}/>
                        <Form.Text className="text-muted">
                          Ask your instructor for todays code.
                        </Form.Text>
                      </Form.Group>
                      <Button variant="primary" type="submit"> Submit </Button>

                    </Form>

                  </Col>
                  <Col />
                </Row>
              </Jumbotron>
            </Container>
        </>
      )
    }


    return (
      
      <>
      <Navbar/>
      <Container>

        <Jumbotron>
          <h1>IRSA Client Management System</h1>
          <h2> Todays Attendance Code: {code} </h2>
          <p> Click on a row to see attendance of that student. </p>
          <p> Click on the checkboxes to select a student who attended todays class, and press "Update" at the bottom of the page to confirm attendance. </p>
        </Jumbotron>
      
        <AttendanceTable />
        
      </Container>
      </>
    
    );
  }
}

export default AttendancePage;