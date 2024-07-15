import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function Login({ show, handleClose, setLoggedIn, setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State to handle password visibility
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => {
            console.log('Login successful:', data);
            setLoggedIn(true);
            setUserEmail(email);
            setEmail('');
            setPassword(''); 
            setShowSuccess(true); 
            setTimeout(() => {
                setShowSuccess(false);
                handleClose(); 
            }, 2000);
        })
        .catch(error => {
            console.error('Failed to login:', error);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal show={show} onHide={() => {
            setEmail('');
            setPassword('');
            handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Log-in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSuccess && <Alert variant="success" className="mt-3">Login successful!</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="dark" onClick={togglePasswordVisibility} className='mt-3 w-100'>
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </Button>
                    </Form.Group>
                    <Button variant="dark" type="submit" className="w-100 mt-3">Log in</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
