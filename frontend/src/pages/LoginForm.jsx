// Import necessary dependencies
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GetUserLogin } from '../slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Functional component for the login form
const LoginForm = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const {message,error} = useSelector((state)=>state.login)
  // State for storing email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isInitialRender = useRef(true);

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    let userdata={
      email:email,
      password:password
    }
    dispatch(GetUserLogin(userdata))
    navigate("/");
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
    <div style={{ backgroundColor: '#3498db', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', width: '50%' }}>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              {/* Email Input */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Login Button */}
              <Button variant="primary m-2" type="submit" block>
                Login
              </Button>


                {/* Signup Link */}
                <p className="text-center mt-3">
                If you're not registered yet,{' '}
                <Link to="/signup">
                  <strong>Create your account</strong>
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


export default LoginForm