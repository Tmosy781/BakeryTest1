import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    navigate("/");
  };

  const customStyle = `
    .navbar-custom {
      background-color: pink !important;
      z-index: 1050;
    }
  `;

  return (
    <>
      <style>{customStyle}</style>
      <ReactNavbar className="navbar-custom" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/about">Contact Us</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                  {/* SVG path data */}
                </svg>
                ({itemCount})
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
              <NavDropdown title="Profile" id="profile-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          )}
        </Container>
      </ReactNavbar>
    </>
  );
};

export default Navbar;