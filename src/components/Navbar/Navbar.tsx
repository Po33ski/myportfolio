import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// This is the Navbar components
// It represents navbar of the page
// This returns navbar with properly pages
const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calculator">Calories Calulator</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/create-diet">Create Diet</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;