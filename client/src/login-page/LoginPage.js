import React from "react";

import Form from "react-bootstrap/Form";

import { Button, Jumbotron, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Cookies from 'universal-cookie';

import { Redirect } from "react-router-dom";

import { Alert } from 'reactstrap';
 



// TODO: make this a functional component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      email: "",
      password: "",
      // showWarning: false,
      redirectToReferrer: false
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

    var data = {username: this.state.email, password: this.state.password};
    // test code
    fetch("/api/login", {
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
      const cookies = new Cookies();
      if (res.auth) {
        console.log("login succeeded!");
        cookies.set('loginSuccess', 'true', { path: '/' });
        console.log("cookie.loginSuccess? ", cookies.get('loginSuccess')); // true
        this.setState((state) => {
          return {...state, redirectToReferrer: true};
        });
      }
      else {
        console.log("login failed!");
        cookies.set('loginSuccess', 'false', { path: '/' });
        console.log(cookies.get('loginSuccess')); // true
        alert("Incorrect Username or Password")
      }
    });

    console.log("after fetch()")

    // console.log("EMAIL & PASS:");

    // console.log(this.state.email);
    // console.log(this.state.password);

    // console.log("CHECK IT:");
    // console.log(this.props.location.state);


    // const cookies = new Cookies();
    // cookies.set('loginSuccess', 'true', { path: '/' });
    // console.log(cookies.get('loginSuccess')); // true

    
  }

  render() {
    console.log("this.props.location.state:");
    console.log(this.props.location.state);
    const { from } = this.props.location.state || { from: { pathname: '/students' } };
    const redirectToReferrer = this.state.redirectToReferrer;
    // console.log("from = ");
    // console.log(from)
    // console.log('props:');
    // console.log(this.props.location.myWarning);
    if (redirectToReferrer === true) {
      console.log("REDIRECT TO FROM");
      console.log("from =");
      console.log(from);
      return <Redirect to={from} />
    }

    return (
      <>
        <Container>
        <h1>Login</h1>
        <div>
      {from.pathname == "/students" ? (
              <Alert color="secondary">
              Log in to view student list!
            </Alert>
      ) : (
        <div></div>
      )}
    </div>
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
