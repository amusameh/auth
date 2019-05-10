import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any.isRequired,
};

export default PrivateRoute;
