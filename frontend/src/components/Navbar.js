import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import CartContext

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { cart } = useCart(); // Get cart data from context
  const itemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0; // Calculate item count

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
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg> ({itemCount})</Nav.Link> {/* Cart link with item count */}
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
