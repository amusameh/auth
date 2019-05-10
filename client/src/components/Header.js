import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isAuthenticated }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/secret">Secret</Link>
        </li>
      </ul>
    </div>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
