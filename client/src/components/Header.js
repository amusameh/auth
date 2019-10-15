import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Li = styled.li`
  margin: 0 2rem;
  list-style: none;
`;
const Wrapper = styled.div`
  padding: 1rem;
  background-color: #a34bc33d;

  .active {
    font-size: 18px;
    font-weight: 900;
  }
`;

const Header = ({ isAuthenticated, name }) => {
  return (
    <Wrapper>
      <ul style={{ display: 'flex', margin: '0' }}>
        <Li>
          <NavLink to="/">Home</NavLink>
        </Li>
        {!isAuthenticated && (
          <>
            <Li>
              <NavLink to="/login">Login</NavLink>
            </Li>
            <Li>
              <NavLink to="/signup">Sign Up</NavLink>
            </Li>
          </>
        )}
        <Li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Li>
        <Li>
          <NavLink to="/admin">Admin</NavLink>
        </Li>
        <Li>
          <NavLink to="/user">User</NavLink>
        </Li>
        <Li>
          <NavLink to="/both">Both</NavLink>
        </Li>

        {isAuthenticated && (
          <Li>
            <span>Hi: {name}</span>
          </Li>
        )}
      </ul>
    </Wrapper>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
