// Signup.js
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup({ show, handleClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.message === 'OTP sent to your email address') {
        setOtpSent(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to sign up');
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        otp: formData.otp,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password 
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
      if (data.message === 'User registered successfully') {
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          otp: ''
        });
        handleClose();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to verify OTP');
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!otpSent ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="me-2"
                />
                <Button variant="dark" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="me-2"
                />
                <Button variant="dark" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100 mt-3">Sign Up</Button>
          </Form>
        ) : (
          <Form onSubmit={handleOtpSubmit}>
            <Form.Group controlId="otp">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="text" name="otp" value={formData.otp} onChange={handleChange} required />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100 mt-3">Verify OTP</Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Signup;
