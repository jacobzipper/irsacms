import React from "react";

import Form from "react-bootstrap/Form";

import { Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: make this a functional component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      email: "DEFAULTEMAIL",
      password: "DEFAULTPASSWORD"
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    console.log("pressed submit!");


    // test code
    fetch("/api")
    .then(res => res.json())
    .then(res => {
      console.log(res);
      
      // post
      fetch("/api", {method: 'POST', body: {"id":1,"name":"Cool Dude","img":null,"reg":"1999-01-12T00:00:00.000Z","waiver":false,"payment":false}})
      .then(res2 => {
        console.log(res2);
      });

    });


    // login code
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    console.log(event.target);

    console.log(this.state.email + " !!!!!");
    console.log(this.state.password + " !!!!!");

    
  }

  render() {

    return (
      <>
        <Jumbotron>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          
        </Jumbotron>
      </>
    );
  }
}

export default Login;
