import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../services/auth';

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <NavbarContainer>
      <h1 style={{ color: 'white' }}>Sugar Fairy</h1>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/products">Products</NavLink>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none' }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;