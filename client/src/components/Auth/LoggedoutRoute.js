import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedOutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !rest.isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

LoggedOutRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default LoggedOutRoute;
