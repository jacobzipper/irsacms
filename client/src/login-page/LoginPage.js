import React from "react";

import Form from "react-bootstrap/Form";

import { Button, Jumbotron, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Cookies from 'universal-cookie';
 



// TODO: make this a functional component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      email: "",
      password: ""
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
    fetch("/api/login", {method: 'POST', body: JSON.stringify({username: "tony", password: "tonybarajas123"})})
    .then(res => res.json())
    .then(res => {
      console.log("RES:");
      console.log(res);
      
    });

    // fetch('/api/')
    //   .then( (res) => { 
    //     console.log(res);
    //   }
    // );

    console.log(this.state.email);
    console.log(this.state.password);


    const cookies = new Cookies();
    cookies.set('loginSuccess', 'true', { path: '/' });
    console.log(cookies.get('loginSuccess')); // true

    
  }

  render() {

    return (
      <>
        <Container>
        <h1>Login</h1>
          <Jumbotron>
        <Row>
          <Col />
          <Col xs={6}>
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
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

export default Login;
