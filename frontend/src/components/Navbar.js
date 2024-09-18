import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import getUserInfo from "../utilities/decodeJwt"; // Adjust the path based on the actual location within src/

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();  // Decode user info from JWT stored in local storage or cookies
  }, []);

  const handleLogout = () => {
    localStorage.clear();  // Clear user session storage or cookies
    setIsAuthenticated(false); // Update authentication state
    navigate("/");
  };

  const customStyle = `
  .navbar-custom {
    background-color: orange !important;
    z-index: 1050; // Bootstrap's default z-index for navbar is 1000, set higher to ensure visibility
  }
`;

  return (
    <>
      <style>{customStyle}</style>
      <ReactNavbar className="navbar-custom" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Nav className="ml-auto">
              <NavDropdown title="Profile" id="profile-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/loginPage">Login</Nav.Link>
            </Nav>
          )}
        </Container>
      </ReactNavbar>
    </>
  );
};

export default Navbar;