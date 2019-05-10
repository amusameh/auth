import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class LoggedOutRoute extends Component {

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          console.log('props', props)
          return !isAuthenticated ?
          <Component {...rest} {...props} />
          : 
          <Redirect to="/"/>
        }
      }
      />
    );
  }
};

export default LoggedOutRoute;
