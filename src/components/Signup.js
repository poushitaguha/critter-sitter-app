import React from 'react';
import { Link } from "react-router-dom";
import { Form, Col, Button } from 'react-bootstrap';
import './styles/signup.css';


export default function Signup() {
  return (
    <div>
      <div className="returning-user">
        <p className="return-label">Returning User?</p>
        <Link to="/login" className="login-link">Login</Link>
      </div>

      <Form className="signup-form">
        <h3>New User Signup</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>

        <Form.Row className="password-signup">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPasswordConfirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" placeholder="Password Confirmation" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control placeholder="123-456-7890" />
        </Form.Group>

        <Form.Group controlId="formGridAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder="Toronto" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control placeholder="Ontario" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPostal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Button variant="info" type="submit" className="signupBtn" block>
          Submit
          </Button>
      </Form>
    </div>
  )
}  