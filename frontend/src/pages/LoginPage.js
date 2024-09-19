import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PRIMARY_COLOR = "#cc5c99";
const SECONDARY_COLOR = '#0c0c1f';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: SECONDARY_COLOR,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={labelStyling}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
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
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Text className="text-muted pt-1">
                  Don't have an account?
                  <span>
                    <Link to="/signup" style={labelStyling}> Sign up
                    </Link>
                  </span>
                </Form.Text>
              </Form.Group>
              {error && <div style={labelStyling} className='pt-3'>{error}</div>}
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
    </section>
  );
};

export default LoginPage;