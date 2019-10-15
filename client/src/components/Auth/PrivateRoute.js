import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({
  component: Component,
  path,
  exact,
  role,
  allowedRoles,
  ...rest
}) {
  const isAuthorizes = allowedRoles.includes(role);
  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        if (rest.isAuthenticated) {
          if (isAuthorizes) {
            return <Component {...props} {...rest} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any.isRequired,
};

export default PrivateRoute;
