import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../context/CartContext';

const PRIMARY_COLOR = "#cc5c99";
const SECONDARY_COLOR = '#0c0c1f';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Sign-up form state
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  const buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: SECONDARY_COLOR,
  };

  const { fetchCart } = useCart();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(username, password);
    setIsAuthenticated(true);
    await fetchCart(); // Now fetchCart should be defined and work properly
    navigate('/');
  } catch (error) {
    console.error('Login failed', error);
    setError('Login failed. Please check your credentials and try again.');
  }
};


  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignUpError('');
    try {
      const response = await fetch('http://localhost:8081/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the token consistently
      localStorage.setItem('token', data.accessToken);
      setIsAuthenticated(true);
      await fetchCart();
      setShowSignUpModal(false);
      navigate('/login'); // Corrected the path
    } catch (error) {
      console.error('Registration failed', error);
      setSignUpError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={labelStyling}>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={labelStyling}>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Text className="text-muted pt-1">
                  Don't have an account?
                  <span
                    style={{ ...labelStyling, cursor: 'pointer', marginLeft: '5px' }}
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Sign up
                  </span>
                </Form.Text>
              </Form.Group>
              {error && <div style={{ color: 'red' }} className='pt-3'>{error}</div>}
              <Button
                variant="primary"
                type="submit"
                style={buttonStyling}
                className='mt-2'
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>

      {/* Sign-Up Modal */}
      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="signUpUsername">
              <Form.Label style={labelStyling}>Username</Form.Label>
              <Form.Control
                type="text"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group controlId="signUpEmail">
              <Form.Label style={labelStyling}>Email</Form.Label>
              <Form.Control
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="signUpPassword">
              <Form.Label style={labelStyling}>Password</Form.Label>
              <Form.Control
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            {signUpError && <div style={{ color: 'red' }}>{signUpError}</div>}
            <Button
              variant="primary"
              type="submit"
              style={buttonStyling}
              className="mt-3"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default LoginPage;
