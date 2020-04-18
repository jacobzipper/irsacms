import React from "react";

import Form from "react-bootstrap/Form";

import { Button, Jumbotron, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../Navbar";



// TODO: make this a functional component
class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      email: "",
      password: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("login mounted!");
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
      this.setState({password: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleNameChange(event) {
      this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username,this.state.email,this.state.password,this.state.name);
    var data = {username: this.state.username, email: this.state.email,
                password: this.state.password, name: this.state.name};
    // test code
    fetch("/api/registration", {
      method: 'POST', 
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.error == 0) {
        console.log("registration succeeded!");
        alert("NICE REGISTRATION!");
      }
      else {
        console.log("registration failed!");
        alert("Failure...");
      }
    });
  }

  render() {

    return (
      <>
        <Navbar/>
        <Container>
        <h1>Registration</h1>
          <Jumbotron>
        <Row>
          <Col />
          <Col xs={6}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" value={this.state.username} onChange={this.handleUsernameChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control placeholder="Enter name" value={this.state.name} onChange={this.handleNameChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Col>
          <Col />
        </Row>
        </Jumbotron>
        </Container>
      </>
    );
  }
}

export default RegistrationPage;
