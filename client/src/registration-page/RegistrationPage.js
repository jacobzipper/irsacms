import React from "react";

import Form from "react-bootstrap/Form";

import { Button, Jumbotron, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Cookies from 'universal-cookie';
 



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
    // event.preventDefault();

    // var data = {username: this.state.email, password: this.state.password};
    // // test code
    // fetch("/api/login", {
    //   method: 'POST', 
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(res => res.json())
    // .then(res => {
    //   console.log(res);
    //   const cookies = new Cookies();
    //   if (res.auth) {
    //     console.log("login succeeded!");
    //     cookies.set('loginSuccess', 'true', { path: '/' });
    //     console.log(cookies.get('loginSuccess')); // true
    //     alert("Logged in! You can now navigate to other parts of the app.")
    //   }
    //   else {
    //     console.log("login failed!");
    //     cookies.set('loginSuccess', 'false', { path: '/' });
    //     console.log(cookies.get('loginSuccess')); // true
    //     alert("Incorrect Username or Password")
    //   }
    // });

    // fetch('/api/')
    //   .then( (res) => { 
    //     console.log(res);
    //   }
    // );

    // console.log(this.state.email);
    // console.log(this.state.password);


    // const cookies = new Cookies();
    // cookies.set('loginSuccess', 'true', { path: '/' });
    // console.log(cookies.get('loginSuccess')); // true

    
  }

  render() {

    return (
      <>
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
