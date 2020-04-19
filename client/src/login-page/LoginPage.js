import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Jumbotron, Container, Row, Col, Form} from "react-bootstrap";
import Cookies from 'universal-cookie';
 

class Login extends React.Component {

  // setting up state
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      email: "",                // credential field
      password: "",             // credential field
      redirectToReferrer: false // used to trigger redirect upon succ login
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  // basic function to update state with typing in username textbox
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }



  // basic function to update state with typing in password textbox
  handlePasswordChange(event) {
      this.setState({password: event.target.value});
  }



  //function to handle checking credentials + redirecting if success
  handleSubmit(event) {
    event.preventDefault();

    var credentials = {username: this.state.email, password: this.state.password};
    
    fetch("/api/login", {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
    .then( res => res.json() )
    .then( res => {

      const cookies = new Cookies();

      if (res.auth) { // if login credentials correct
        cookies.set('loginSuccess', 'true', { path: '/' }); // set browser cookie
        cookies.set('userType', res.userType , { path: '/' }); // set browser cookie    
        
        this.setState((state) => {                          // trigger rerender
          return {...state, redirectToReferrer: true};
        });
      }
      else {  // else, wrong credentials
        cookies.set('loginSuccess', 'false', { path: '/' });
        cookies.set('userType', "" , { path: '/' }); // set browser cookie    
        alert("Incorrect Username or Password")
      }

    });
    
  } //handleSubmit()



  render() {
    
    // from = "where we came FROM", will redirect to FROM if success auth
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // redirectToReferrer init to false, set to true in handleSubmit() if succ auth
    const redirectToReferrer = this.state.redirectToReferrer;
    
    // if redirect, go to FROM
    if (redirectToReferrer === true) {
      return (<Redirect to={from} />);
    }

    // else, show login page. TODO: make this prettier.
    return (
        <Container>
          <p> <br/></p> {/* <---- TODO: what is non hack way to do this ?? */}
          <h1>IRSA Login</h1>
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

                  <Button variant="primary" type="submit"> Submit </Button>

                </Form>

              </Col>
              <Col />
            </Row>
          </Jumbotron>
        </Container>
    );
  } //render()
  
}



export default Login;