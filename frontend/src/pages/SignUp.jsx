// Import necessary dependencies
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetUserSignup } from '../slices/SignupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


// Functional component for the signup form
const SignupForm = () => {
  const dispatch= useDispatch();
  const {message,error} = useSelector((state)=>state.userSignup)
  const isInitialRender = useRef(true);
  // State for storing form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const userDetails = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    if (password === confirmPassword) {
      try {
        dispatch(GetUserSignup(userDetails));
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  const alertBox = useCallback(() => {
    if (!isInitialRender.current) {
      if (message) {
        toast.success(message);
      }
      else if (error) {
        toast.error(error);
      }
    }
  }, [error, message]);

  useEffect(() => {
    alertBox();
    isInitialRender.current = false;
  }, [alertBox,message, error]);
  return (
    <div style={{ backgroundColor: '#3498db', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', width: '50%' }}>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center mb-4">Signup</h2>
            {/* Alert for demonstration purposes */}
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                {message?message:error }
              </Alert>
            )}
            <Form onSubmit={handleSignup}>
              {/* Name Input */}
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              {/* Email Input */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              {/* Phone Input */}
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              {/* Confirm Password Input */}
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </Form.Group>

              {/* Signup Button */}
              <Button variant="primary" type="submit" block- className='m-2'>
                Signup now
              </Button>

              {/* Login Link */}
              <p className="text-center mt-3">
                If you already have an account,
                <Link to="/login">
                  <strong>login here</strong>
                </Link>
                .
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupForm;
